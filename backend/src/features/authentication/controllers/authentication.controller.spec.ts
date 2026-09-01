import { HttpStatus, type INestApplication } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test, type TestingModule } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import { buildGetUserResponse } from 'src/common/builders/users/getUserResponse.builder';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Role } from 'src/common/types/enums';
import { USERS_REPOSITORY } from 'src/features/users/tokens/users.token';
import request from 'supertest';
import {
	afterAll,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest';
import { AuthenticationModule } from '../authentication.module';
import { TokenService } from '../services/token.service';
import { toStringHash } from '../utilities/stringTransform';

import type { UpdateSessionData } from 'src/common/interfaces/authentication/updateSessionData.interface';
import type { IUsersRepository } from 'src/features/users/contracts/users.repository.contract';

describe('AuthenticationController', () => {
	let app: INestApplication;
	let tokenService: TokenService;

	const user = buildGetUserResponse()
		.withId('user-1')
		.withName('Test User')
		.withEmail('test@test.com')
		.withRole(Role.USER)
		.withSessionId('session-1')
		.build();

	const getSessionMock = vi.fn();
	const getUserByIdMock = vi.fn();
	const updateSessionMock = vi.fn();
	const logoutUserMock = vi.fn();

	const session = {
		id: user.sessionId,
		refreshTokenHash: null as string | null,
	};

	beforeAll(async () => {
		const repository: Partial<IUsersRepository> = {
			getSession: getSessionMock,
			getUserById: getUserByIdMock,
			updateSession: updateSessionMock,
			logoutUser: logoutUserMock,
		};

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [AuthenticationModule],
			providers: [
				JwtService,
				TokenService,
				Reflector,
				{
					provide: APP_GUARD,
					useClass: AuthenticationGuard,
				},
				{
					provide: APP_GUARD,
					useClass: AuthorizationGuard,
				},
			],
		})
			.overrideProvider(USERS_REPOSITORY)
			.useValue(repository)
			.compile();

		app = moduleRef.createNestApplication();
		app.use(cookieParser());

		await app.init();

		tokenService = moduleRef.get(TokenService);
	});

	beforeEach(() => {
		vi.clearAllMocks();

		session.refreshTokenHash = null;

		getSessionMock.mockImplementation(async (sessionId: string) => {
			if (sessionId !== session.id) {
				return null;
			}

			return {
				id: session.id,
				refreshTokenHash: session.refreshTokenHash,
			};
		});

		getUserByIdMock.mockResolvedValue(user);

		updateSessionMock.mockImplementation(async (data: UpdateSessionData) => {
			session.refreshTokenHash = data.refreshTokenHash;

			return {
				id: data.sessionId,
			};
		});

		logoutUserMock.mockResolvedValue(undefined);
	});

	afterAll(async () => {
		await app.close();
	});

	async function createRefreshToken(): Promise<string> {
		const { refreshToken } = await tokenService.generateTokens({
			sub: user.id,
			role: user.role,
			sessionId: session.id,
		});

		session.refreshTokenHash = await toStringHash(refreshToken);

		return refreshToken;
	}

	function getRefreshCookie(response: {
		headers: Record<string, unknown>;
	}): string | undefined {
		const cookies = response.headers['set-cookie'];

		if (!Array.isArray(cookies)) {
			return undefined;
		}

		return cookies.find((cookie) => cookie.startsWith('refresh_token='));
	}

	function extractRefreshToken(cookie: string): string {
		return cookie.split(';')[0].replace('refresh_token=', '');
	}

	describe('Refresh token', () => {
		it('should refresh and rotate the refresh token', async () => {
			const oldRefreshToken = await createRefreshToken();

			const response = await request(app.getHttpServer())
				.post('/authentication/refresh')
				.set('Cookie', `refresh_token=${oldRefreshToken}`)
				.expect(HttpStatus.CREATED);

			expect(response.body).toEqual({
				accessToken: expect.any(String),
			});

			const newCookie = getRefreshCookie(response);

			expect(newCookie).toBeDefined();

			const newRefreshToken = extractRefreshToken(newCookie!);

			expect(newRefreshToken).not.toBe(oldRefreshToken);
			expect(updateSessionMock).toHaveBeenCalledOnce();
			expect(session.refreshTokenHash).not.toBeNull();
		});

		it('should reject the old refresh token after rotation', async () => {
			const oldRefreshToken = await createRefreshToken();

			await request(app.getHttpServer())
				.post('/authentication/refresh')
				.set('Cookie', `refresh_token=${oldRefreshToken}`)
				.expect(HttpStatus.CREATED);

			await request(app.getHttpServer())
				.post('/authentication/refresh')
				.set('Cookie', `refresh_token=${oldRefreshToken}`)
				.expect(HttpStatus.UNAUTHORIZED);
		});

		it('should allow the rotated refresh token to be used', async () => {
			const oldRefreshToken = await createRefreshToken();

			const firstRefresh = await request(app.getHttpServer())
				.post('/authentication/refresh')
				.set('Cookie', `refresh_token=${oldRefreshToken}`)
				.expect(HttpStatus.CREATED);

			const newCookie = getRefreshCookie(firstRefresh);

			expect(newCookie).toBeDefined();

			const newRefreshToken = extractRefreshToken(newCookie!);

			await request(app.getHttpServer())
				.post('/authentication/refresh')
				.set('Cookie', `refresh_token=${newRefreshToken}`)
				.expect(HttpStatus.CREATED);
		});

		it('should set the refresh cookie with the expected security attributes', async () => {
			const oldRefreshToken = await createRefreshToken();

			const response = await request(app.getHttpServer())
				.post('/authentication/refresh')
				.set('Cookie', `refresh_token=${oldRefreshToken}`)
				.expect(HttpStatus.CREATED);

			const refreshCookie = getRefreshCookie(response);

			expect(refreshCookie).toBeDefined();
			expect(refreshCookie).toContain('HttpOnly');
			expect(refreshCookie).toContain('Path=/authentication');
			expect(refreshCookie).toContain('SameSite=Lax');
		});

		it('should reject refresh when the refresh cookie is missing', async () => {
			await request(app.getHttpServer())
				.post('/authentication/refresh')
				.expect(HttpStatus.UNAUTHORIZED);
		});
	});

	describe('Logout', () => {
		it('should logout the current session and clear the refresh cookie', async () => {
			const refreshToken = await createRefreshToken();

			const response = await request(app.getHttpServer())
				.post('/authentication/logout')
				.set('Cookie', `refresh_token=${refreshToken}`)
				.expect(HttpStatus.CREATED);

			expect(logoutUserMock).toHaveBeenCalledOnce();
			expect(logoutUserMock).toHaveBeenCalledWith(session.id);

			const clearedCookie = getRefreshCookie(response);

			expect(clearedCookie).toBeDefined();
			expect(clearedCookie).toContain('Path=/authentication');
			expect(clearedCookie).toContain('HttpOnly');
			expect(clearedCookie).toContain('SameSite=Lax');
			expect(clearedCookie).toContain('Expires=');
		});

		it('should reject logout when the refresh cookie is missing', async () => {
			await request(app.getHttpServer())
				.post('/authentication/logout')
				.expect(HttpStatus.UNAUTHORIZED);

			expect(logoutUserMock).not.toHaveBeenCalled();
		});
	});
});
