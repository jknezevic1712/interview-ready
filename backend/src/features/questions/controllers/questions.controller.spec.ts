import { HttpStatus, type INestApplication } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { buildCreateQuestion } from 'src/common/builders/questions/createQuestion.builder';
import { buildGetQuestion } from 'src/common/builders/questions/getQuestion.builder';
import { buildUpdateQuestion } from 'src/common/builders/questions/updateQuestion.builder';
import { buildGetUser } from 'src/common/builders/users/getUser.builder';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Role } from 'src/common/types/enums';
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
import { QuestionsService } from '../services/questions.service';
import { QuestionsController } from './questions.controller';

describe('QuestionsController', () => {
	let app: INestApplication;
	let tokenService: TokenService;

	let questionsService: Omit<Mocked<QuestionsService>, 'questionsRepository'>;

	const standardUser = buildGetUser()
		.withId('user-1')
		.withRole(Role.USER)
		.withSessionId('session-1')
		.build();

	const adminUser = buildGetUser()
		.withId('admin-1')
		.withRole(Role.ADMIN)
		.withSessionId('session-2')
		.build();

	const sessionId = 'clh7g4x1m0000q8z1p2r3s4t';
	const questionId = 'clh7g4x1m0000q8z1p2r3s4u';

	let standardUserAccessToken = '';
	let adminUserAccessToken = '';

	const createQuestionData = buildCreateQuestion()
		.withText('What is React?')
		.build();

	const updateQuestionData = buildUpdateQuestion()
		.withQuestionId(questionId)
		.withText('What is React?')
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

	function getQuestionsServiceMocks(): typeof questionsService {
		return {
			getQuestions: vi
				.fn()
				.mockResolvedValue(
					[] satisfies Awaited<
						ReturnType<typeof questionsService.getQuestions>
					>,
				),

			createQuestion: vi
				.fn()
				.mockResolvedValue(
					buildGetQuestion().build() satisfies Awaited<
						ReturnType<typeof questionsService.createQuestion>
					>,
				),

			updateQuestion: vi
				.fn()
				.mockResolvedValue(
					buildGetQuestion().build() satisfies Awaited<
						ReturnType<typeof questionsService.updateQuestion>
					>,
				),

			linkQuestion: vi
				.fn()
				.mockResolvedValue(
					undefined satisfies Awaited<
						ReturnType<typeof questionsService.linkQuestion>
					>,
				),

			unlinkQuestion: vi
				.fn()
				.mockResolvedValue(
					undefined satisfies Awaited<
						ReturnType<typeof questionsService.unlinkQuestion>
					>,
				),

			archiveQuestion: vi
				.fn()
				.mockResolvedValue(
					undefined satisfies Awaited<
						ReturnType<typeof questionsService.archiveQuestion>
					>,
				),
		};
	}

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [QuestionsController],
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
				if (token === QuestionsService) {
					return getQuestionsServiceMocks();
				}
			})
			.compile();

		app = moduleRef.createNestApplication();

		await app.init();

		questionsService = moduleRef.get(QuestionsService);
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
		it('should return questions for the requested session', async () => {
			await request(app.getHttpServer())
				.get('/questions')
				.query({ sessionId })
				.set('Authorization', `Bearer ${standardUserAccessToken}`)
				.expect(HttpStatus.OK);

			expect(questionsService.getQuestions).toHaveBeenCalledOnce();
			expect(questionsService.getQuestions).toHaveBeenCalledWith(
				sessionId,
				standardUser.id,
			);
		});

		it('should not allow creating a question', async () => {
			await request(app.getHttpServer())
				.post('/questions')
				.set('Authorization', `Bearer ${standardUserAccessToken}`)
				.send(createQuestionData)
				.expect(HttpStatus.FORBIDDEN);

			expect(questionsService.createQuestion).not.toHaveBeenCalled();
		});

		it('should not allow updating a question', async () => {
			await request(app.getHttpServer())
				.patch('/questions')
				.set('Authorization', `Bearer ${standardUserAccessToken}`)
				.send(updateQuestionData)
				.expect(HttpStatus.FORBIDDEN);

			expect(questionsService.updateQuestion).not.toHaveBeenCalled();
		});

		it('should not allow linking a question', async () => {
			await request(app.getHttpServer())
				.post('/questions/link')
				.query({
					sessionId,
					questionId,
				})
				.set('Authorization', `Bearer ${standardUserAccessToken}`)
				.expect(HttpStatus.FORBIDDEN);

			expect(questionsService.linkQuestion).not.toHaveBeenCalled();
		});

		it('should not allow unlinking a question', async () => {
			await request(app.getHttpServer())
				.delete('/questions/unlink')
				.query({
					sessionId,
					questionId,
				})
				.set('Authorization', `Bearer ${standardUserAccessToken}`)
				.expect(HttpStatus.FORBIDDEN);

			expect(questionsService.unlinkQuestion).not.toHaveBeenCalled();
		});

		it('should not allow archiving a question', async () => {
			await request(app.getHttpServer())
				.patch('/questions/archive')
				.query({ questionId })
				.set('Authorization', `Bearer ${standardUserAccessToken}`)
				.expect(HttpStatus.FORBIDDEN);

			expect(questionsService.archiveQuestion).not.toHaveBeenCalled();
		});
	});

	describe('Admin user', () => {
		it('should return questions for the requested session', async () => {
			await request(app.getHttpServer())
				.get('/questions')
				.query({ sessionId })
				.set('Authorization', `Bearer ${adminUserAccessToken}`)
				.expect(HttpStatus.OK);

			expect(questionsService.getQuestions).toHaveBeenCalledOnce();
			expect(questionsService.getQuestions).toHaveBeenCalledWith(
				sessionId,
				adminUser.id,
			);
		});

		it('should create a question', async () => {
			await request(app.getHttpServer())
				.post('/questions')
				.set('Authorization', `Bearer ${adminUserAccessToken}`)
				.send(createQuestionData)
				.expect(HttpStatus.CREATED);

			expect(questionsService.createQuestion).toHaveBeenCalledOnce();
			expect(questionsService.createQuestion).toHaveBeenCalledWith(
				createQuestionData,
			);
		});

		it('should update a question', async () => {
			await request(app.getHttpServer())
				.patch('/questions')
				.set('Authorization', `Bearer ${adminUserAccessToken}`)
				.send(updateQuestionData)
				.expect(HttpStatus.OK);

			expect(questionsService.updateQuestion).toHaveBeenCalledOnce();
			expect(questionsService.updateQuestion).toHaveBeenCalledWith(
				updateQuestionData,
			);
		});

		it('should link a question', async () => {
			await request(app.getHttpServer())
				.post('/questions/link')
				.query({
					sessionId,
					questionId,
				})
				.set('Authorization', `Bearer ${adminUserAccessToken}`)
				.expect(HttpStatus.NO_CONTENT);

			expect(questionsService.linkQuestion).toHaveBeenCalledOnce();
			expect(questionsService.linkQuestion).toHaveBeenCalledWith(
				sessionId,
				questionId,
			);
		});

		it('should unlink a question', async () => {
			await request(app.getHttpServer())
				.delete('/questions/unlink')
				.query({
					sessionId,
					questionId,
				})
				.set('Authorization', `Bearer ${adminUserAccessToken}`)
				.expect(HttpStatus.NO_CONTENT);

			expect(questionsService.unlinkQuestion).toHaveBeenCalledOnce();
			expect(questionsService.unlinkQuestion).toHaveBeenCalledWith(
				sessionId,
				questionId,
			);
		});

		it('should archive a question', async () => {
			await request(app.getHttpServer())
				.patch('/questions/archive')
				.query({ questionId })
				.set('Authorization', `Bearer ${adminUserAccessToken}`)
				.expect(HttpStatus.NO_CONTENT);

			expect(questionsService.archiveQuestion).toHaveBeenCalledOnce();
			expect(questionsService.archiveQuestion).toHaveBeenCalledWith(questionId);
		});
	});

	describe('Authentication', () => {
		it('should reject requests without an access token', async () => {
			await request(app.getHttpServer())
				.get('/questions')
				.query({ sessionId })
				.expect(HttpStatus.UNAUTHORIZED);

			expect(questionsService.getQuestions).not.toHaveBeenCalled();
		});
	});

	describe('Validation', () => {
		it('should reject an invalid session id', async () => {
			await request(app.getHttpServer())
				.get('/questions')
				.query({ sessionId: 'invalid-session-id' })
				.set('Authorization', `Bearer ${standardUserAccessToken}`)
				.expect(HttpStatus.BAD_REQUEST);

			expect(questionsService.getQuestions).not.toHaveBeenCalled();
		});

		it('should reject an invalid question id when linking', async () => {
			await request(app.getHttpServer())
				.post('/questions/link')
				.query({
					sessionId,
					questionId: 'invalid-question-id',
				})
				.set('Authorization', `Bearer ${adminUserAccessToken}`)
				.expect(HttpStatus.BAD_REQUEST);

			expect(questionsService.linkQuestion).not.toHaveBeenCalled();
		});

		it('should reject an invalid question id when archiving', async () => {
			await request(app.getHttpServer())
				.patch('/questions/archive')
				.query({ questionId: 'invalid-question-id' })
				.set('Authorization', `Bearer ${adminUserAccessToken}`)
				.expect(HttpStatus.BAD_REQUEST);

			expect(questionsService.archiveQuestion).not.toHaveBeenCalled();
		});
	});
});
