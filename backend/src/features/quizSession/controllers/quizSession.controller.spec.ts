import { HttpStatus, type INestApplication } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { buildCreateQuizResponseRequest } from 'src/common/builders/quizSession/createQuizResponseRequest.builder';
import { buildGetQuizSessionLiteResponse } from 'src/common/builders/quizSession/getQuizSessionLiteResponse.builder';
import { buildGetQuizSessionResponse } from 'src/common/builders/quizSession/getQuizSessionResponse.builder';
import { buildUpdateQuizSessionStatusRequest } from 'src/common/builders/quizSession/updateQuizSessionStatusRequest.builder';
import { buildGetUserResponse } from 'src/common/builders/users/getUserResponse.builder';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { QuizSessionStatus, Role } from 'src/common/types/enums';
import { TokenService } from 'src/features/authentication/services/token.service';
import request from 'supertest';
import {
	afterAll,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	type Mocked,
	vi,
} from 'vitest';
import { QuizSessionService } from '../services/quizSession.service';
import { QuizSessionController } from './quizSession.controller';

describe('QuizSessionController', () => {
	let app: INestApplication;
	let tokenService: TokenService;

	let quizSessionService: Omit<
		Mocked<QuizSessionService>,
		'quizSessionRepository'
	>;

	const standardUser = buildGetUserResponse()
		.withId('user-1')
		.withRole(Role.USER)
		.withSessionId('session-1')
		.build();

	const adminUser = buildGetUserResponse()
		.withId('admin-1')
		.withRole(Role.ADMIN)
		.withSessionId('session-2')
		.build();

	const sessionId = 'clh7g4x1m0000q8z1p2r3s4t';

	let standardUserAccessToken = '';
	let adminUserAccessToken = '';

	const quizSession = buildGetQuizSessionResponse()
		.withId(sessionId)
		.withUser({
			id: standardUser.id,
			name: standardUser.name,
		})
		.build();
	const quizSessionLite = buildGetQuizSessionLiteResponse()
		.withId(sessionId)
		.withUser({
			id: standardUser.id,
			name: standardUser.name,
		})
		.build();
	const createQuizResponseData = buildCreateQuizResponseRequest().build();
	const updateQuizSessionStatusData = buildUpdateQuizSessionStatusRequest()
		.withSessionStatus(QuizSessionStatus.COMPLETED)
		.build();

	async function createTokens() {
		const { accessToken: standardToken } = await tokenService.generateTokens({
			sub: standardUser.id,
			role: standardUser.role,
			sessionId: standardUser.sessionId,
		});

		standardUserAccessToken = standardToken;

		const { accessToken: adminToken } = await tokenService.generateTokens({
			sub: adminUser.id,
			role: adminUser.role,
			sessionId: adminUser.sessionId,
		});

		adminUserAccessToken = adminToken;
	}

	function createQuizSessionServiceMocks(): typeof quizSessionService {
		return {
			getQuizSessions: vi
				.fn()
				.mockResolvedValue([quizSessionLite] satisfies Awaited<
					ReturnType<typeof quizSessionService.getQuizSessions>
				>),

			getQuizSession: vi
				.fn()
				.mockResolvedValue(
					quizSession satisfies Awaited<
						ReturnType<typeof quizSessionService.getQuizSession>
					>,
				),

			createQuizSession: vi
				.fn()
				.mockResolvedValue(
					quizSessionLite satisfies Awaited<
						ReturnType<typeof quizSessionService.createQuizSession>
					>,
				),

			updateQuizSessionStatus: vi
				.fn()
				.mockResolvedValue(
					quizSession satisfies Awaited<
						ReturnType<typeof quizSessionService.updateQuizSessionStatus>
					>,
				),

			createQuizResponse: vi
				.fn()
				.mockResolvedValue(
					{} as Awaited<
						ReturnType<typeof quizSessionService.createQuizResponse>
					>,
				),
		};
	}

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [QuizSessionController],
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
			.useMocker((token) => {
				if (token === QuizSessionService) {
					return createQuizSessionServiceMocks();
				}
			})
			.compile();

		app = moduleRef.createNestApplication();

		await app.init();

		quizSessionService = moduleRef.get(QuizSessionService);
		tokenService = moduleRef.get(TokenService);

		await createTokens();
	});

	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('Standard user', () => {
		it('should return quiz sessions', async () => {
			await request(app.getHttpServer())
				.get('/quiz-sessions')
				.set('Authorization', `Bearer ${standardUserAccessToken}`)
				.expect(HttpStatus.OK);

			expect(quizSessionService.getQuizSessions).toHaveBeenCalledOnce();
			expect(quizSessionService.getQuizSessions).toHaveBeenCalledWith(
				standardUser.id,
			);
		});

		it('should return a quiz session by id', async () => {
			await request(app.getHttpServer())
				.get(`/quiz-sessions/${sessionId}`)
				.set('Authorization', `Bearer ${standardUserAccessToken}`)
				.expect(HttpStatus.OK);

			expect(quizSessionService.getQuizSession).toHaveBeenCalledOnce();
			expect(quizSessionService.getQuizSession).toHaveBeenCalledWith(
				sessionId,
				standardUser.id,
			);
		});

		it('should create a quiz session', async () => {
			await request(app.getHttpServer())
				.post('/quiz-sessions/create')
				.set('Authorization', `Bearer ${standardUserAccessToken}`)
				.expect(HttpStatus.CREATED);

			expect(quizSessionService.createQuizSession).toHaveBeenCalledOnce();

			expect(quizSessionService.createQuizSession).toHaveBeenCalledWith(
				standardUser.id,
			);
		});

		it('should update quiz session status', async () => {
			await request(app.getHttpServer())
				.patch(`/quiz-sessions/${sessionId}`)
				.set('Authorization', `Bearer ${standardUserAccessToken}`)
				.send(updateQuizSessionStatusData)
				.expect(HttpStatus.OK);

			expect(quizSessionService.updateQuizSessionStatus).toHaveBeenCalledOnce();

			expect(quizSessionService.updateQuizSessionStatus).toHaveBeenCalledWith(
				sessionId,
				standardUser.id,
				updateQuizSessionStatusData.sessionStatus,
			);
		});

		it('should create a quiz response', async () => {
			await request(app.getHttpServer())
				.post('/quiz-sessions/response')
				.set('Authorization', `Bearer ${standardUserAccessToken}`)
				.send(createQuizResponseData)
				.expect(HttpStatus.CREATED);

			expect(quizSessionService.createQuizResponse).toHaveBeenCalledOnce();

			expect(quizSessionService.createQuizResponse).toHaveBeenCalledWith(
				createQuizResponseData,
				standardUser.id,
			);
		});
	});

	describe('Admin user', () => {
		it('should return quiz sessions', async () => {
			await request(app.getHttpServer())
				.get('/quiz-sessions')
				.set('Authorization', `Bearer ${adminUserAccessToken}`)
				.expect(HttpStatus.OK);

			expect(quizSessionService.getQuizSessions).toHaveBeenCalledOnce();
			expect(quizSessionService.getQuizSessions).toHaveBeenCalledWith(
				adminUser.id,
			);
		});

		it('should return a quiz session by id', async () => {
			await request(app.getHttpServer())
				.get(`/quiz-sessions/${sessionId}`)
				.set('Authorization', `Bearer ${adminUserAccessToken}`)
				.expect(HttpStatus.OK);

			expect(quizSessionService.getQuizSession).toHaveBeenCalledOnce();
			expect(quizSessionService.getQuizSession).toHaveBeenCalledWith(
				sessionId,
				adminUser.id,
			);
		});

		it('should create a quiz session', async () => {
			await request(app.getHttpServer())
				.post('/quiz-sessions/create')
				.set('Authorization', `Bearer ${adminUserAccessToken}`)
				.expect(HttpStatus.CREATED);

			expect(quizSessionService.createQuizSession).toHaveBeenCalledOnce();

			expect(quizSessionService.createQuizSession).toHaveBeenCalledWith(
				adminUser.id,
			);
		});

		it('should update quiz session status', async () => {
			await request(app.getHttpServer())
				.patch(`/quiz-sessions/${sessionId}`)
				.set('Authorization', `Bearer ${adminUserAccessToken}`)
				.send(updateQuizSessionStatusData)
				.expect(HttpStatus.OK);

			expect(quizSessionService.updateQuizSessionStatus).toHaveBeenCalledOnce();

			expect(quizSessionService.updateQuizSessionStatus).toHaveBeenCalledWith(
				sessionId,
				adminUser.id,
				updateQuizSessionStatusData.sessionStatus,
			);
		});

		it('should create a quiz response', async () => {
			await request(app.getHttpServer())
				.post('/quiz-sessions/response')
				.set('Authorization', `Bearer ${adminUserAccessToken}`)
				.send(createQuizResponseData)
				.expect(HttpStatus.CREATED);

			expect(quizSessionService.createQuizResponse).toHaveBeenCalledOnce();

			expect(quizSessionService.createQuizResponse).toHaveBeenCalledWith(
				createQuizResponseData,
				adminUser.id,
			);
		});
	});

	describe('Authentication', () => {
		it('should reject requests without an access token', async () => {
			await request(app.getHttpServer())
				.get('/quiz-sessions')
				.expect(HttpStatus.UNAUTHORIZED);

			expect(quizSessionService.getQuizSessions).not.toHaveBeenCalled();
		});
	});

	describe('Validation', () => {
		it('should reject an invalid session id', async () => {
			await request(app.getHttpServer())
				.get('/quiz-sessions/not-a-cuid')
				.set('Authorization', `Bearer ${standardUserAccessToken}`)
				.expect(HttpStatus.BAD_REQUEST);

			expect(quizSessionService.getQuizSession).not.toHaveBeenCalled();
		});

		it('should reject an invalid session id when updating status', async () => {
			await request(app.getHttpServer())
				.patch('/quiz-sessions/not-a-cuid')
				.set('Authorization', `Bearer ${standardUserAccessToken}`)
				.send(updateQuizSessionStatusData)
				.expect(HttpStatus.BAD_REQUEST);

			expect(quizSessionService.updateQuizSessionStatus).not.toHaveBeenCalled();
		});
	});
});
