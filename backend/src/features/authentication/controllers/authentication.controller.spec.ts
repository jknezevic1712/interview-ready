import 'reflect-metadata';

import { HttpStatus, type INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';
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
import { AuthenticationService } from '../services/authentication.service';
import { TokenService } from '../services/token.service';
import { toStringHash } from '../utilities/stringTransform';
import { AuthenticationController } from './authentication.controller';

import type { UpdateSessionData } from 'src/common/interfaces/authentication/updateSessionData.interface';
import type { IUsersRepository } from 'src/features/users/contracts/users.repository';

describe('AuthenticationController', () => {
	describe('Unit tests', () => {
		let controller: AuthenticationController;
		let authenticationService: {
			registerViaEmailAndPassword: ReturnType<typeof vi.fn>;
			loginViaEmailAndPassword: ReturnType<typeof vi.fn>;
			refreshAccessToken: ReturnType<typeof vi.fn>;
			logoutUser: ReturnType<typeof vi.fn>;
		};

		beforeEach(async () => {
			authenticationService = {
				registerViaEmailAndPassword: vi.fn(),
				loginViaEmailAndPassword: vi.fn(),
				refreshAccessToken: vi.fn(),
				logoutUser: vi.fn(),
			};

			const module: TestingModule = await Test.createTestingModule({
				controllers: [AuthenticationController],
				providers: [
					{
						provide: AuthenticationService,
						useValue: authenticationService,
					},
				],
			}).compile();

			controller = module.get(AuthenticationController);
		});

		it('should refresh tokens and set a new refresh-token cookie', async () => {
			const refreshToken = 'old-refresh-token';

			authenticationService.refreshAccessToken.mockResolvedValue({
				accessToken: 'new-access-token',
				refreshToken: 'new-refresh-token',
			});

			const request = {
				cookies: {
					refresh_token: refreshToken,
				},
			} as unknown as Request;

			const cookie = vi.fn();

			const response = {
				cookie,
			} as unknown as Response;

			const result = await controller.refreshAccessToken(request, response);

			expect(authenticationService.refreshAccessToken).toHaveBeenCalledWith(
				refreshToken,
			);

			expect(cookie).toHaveBeenCalledWith(
				'refresh_token',
				'new-refresh-token',
				expect.objectContaining({
					httpOnly: true,
					sameSite: 'lax',
					path: '/authentication',
				}),
			);

			expect(result).toEqual({
				accessToken: 'new-access-token',
			});
		});

		it('should logout the current session', async () => {
			const refreshToken = 'refresh-token';

			authenticationService.logoutUser.mockResolvedValue(undefined);

			const request = {
				cookies: {
					refresh_token: refreshToken,
				},
			} as unknown as Request;

			const clearCookie = vi.fn();

			const response = {
				clearCookie,
			} as unknown as Response;

			await controller.logout(request, response);

			expect(authenticationService.logoutUser).toHaveBeenCalledWith(
				refreshToken,
			);

			expect(clearCookie).toHaveBeenCalledWith(
				'refresh_token',
				expect.objectContaining({
					path: '/authentication',
				}),
			);
		});
	});

	describe('Integration tests', () => {
		let app: INestApplication;
		let tokenService: TokenService;

		const user = {
			id: 'user-1',
			name: 'Test User',
			email: 'test@test.com',
			role: 'USER' as const,
		};

		const session = {
			id: 'session-1',
			refreshTokenHash: null as string | null,
		};

		const getSessionMock = vi.fn();
		const getUserByIdMock = vi.fn();
		const updateSessionMock = vi.fn();
		const logoutUserMock = vi.fn();

		beforeAll(async () => {
			const repository: Partial<IUsersRepository> = {
				getSession: getSessionMock,
				getUserById: getUserByIdMock,
				updateSession: updateSessionMock,
				logoutUser: logoutUserMock,
			};

			const moduleRef: TestingModule = await Test.createTestingModule({
				imports: [AuthenticationModule],
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

		it('should logout and clear the refresh token cookie', async () => {
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

		it('should reject refresh when the refresh cookie is missing', async () => {
			await request(app.getHttpServer())
				.post('/authentication/refresh')
				.expect(HttpStatus.UNAUTHORIZED);
		});
	});
});
