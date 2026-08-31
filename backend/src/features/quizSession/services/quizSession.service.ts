import {
	BadRequestException,
	ConflictException,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateQuizResponse } from 'src/common/dtos/quizSession/createQuizResponse.dto';
import { GetQuizResponse } from 'src/common/dtos/quizSession/getQuizResponse.dto';
import { GetQuizSession } from 'src/common/dtos/quizSession/getQuizSession.dto';
import { GetQuizSessionLite } from 'src/common/dtos/quizSession/getQuizSessionLite.dto';
import { Difficulty, QuizSessionStatus } from 'src/common/types/client';
import { COMPLETION_STATUSES } from '../constants/completionStatuses';
import {
	toGetQuizResponse,
	toGetQuizSession,
	toGetQuizSessionLite,
} from '../mappers/quizSession.mapper';
import { QUIZ_SESSION_REPOSITORY } from '../tokens/quizSession.token';
import { CreateQuizResponseInput } from '../types/createQuizResponse.input';
import { QuizSessionQuestionLitePayload } from '../utilities/quizSession.selects';

import type { IQuizSessionRepository } from '../contracts/quizSession.repository';

@Injectable()
export class QuizSessionService {
	constructor(
		@Inject(QUIZ_SESSION_REPOSITORY)
		private readonly quizSessionRepository: IQuizSessionRepository,
	) {}

	async getQuizSessions(userId: string): Promise<GetQuizSessionLite[]> {
		const quizSessions =
			await this.quizSessionRepository.getQuizSessions(userId);
		return quizSessions.map(toGetQuizSessionLite);
	}

	async getQuizSession(
		sessionId: string,
		userId: string,
	): Promise<GetQuizSession> {
		const session = await this.quizSessionRepository.getQuizSession(
			sessionId,
			userId,
		);
		if (!session) {
			throw new NotFoundException(`Quiz session not found`);
		}

		return toGetQuizSession(session);
	}

	async createQuizSession(userId: string): Promise<GetQuizSessionLite> {
		const session = await this.quizSessionRepository.createQuizSession(userId);
		return toGetQuizSessionLite(session);
	}

	async updateQuizSessionStatus(
		sessionId: string,
		userId: string,
		sessionStatus: QuizSessionStatus,
	): Promise<GetQuizSession> {
		const quizSession = await this.quizSessionRepository.getQuizSession(
			sessionId,
			userId,
		);
		if (!quizSession) {
			throw new NotFoundException(`Quiz session not found`);
		}

		// ? Validate the quiz session is in progress status
		if (quizSession.status !== QuizSessionStatus.IN_PROGRESS) {
			throw new ConflictException('Quiz session is not in progress');
		}

		// ? Validate that the new quiz session status is allowed
		if (!COMPLETION_STATUSES.includes(sessionStatus)) {
			throw new BadRequestException(
				'Quiz session can only be completed or abandoned',
			);
		}

		const updatedSession =
			await this.quizSessionRepository.updateQuizSessionStatus(
				sessionId,
				sessionStatus,
				userId,
			);
		return toGetQuizSession(updatedSession);
	}

	async createQuizResponse(
		data: CreateQuizResponse,
		userId: string,
	): Promise<GetQuizResponse> {
		const quizSessionQuestionRecord =
			await this.quizSessionRepository.getQuizSessionQuestionRecordLite(
				data.sessionId,
				data.questionId,
				userId,
			);

		this.validateQuizSessionQuestionRecord(
			quizSessionQuestionRecord,
			data.sessionId,
			data.questionId,
		);

		const quizResponse = await this.quizSessionRepository.createQuizResponse(
			// biome-ignore lint/style/noNonNullAssertion: <will certainly be truthy since we throw if it's not in above method>
			this.getQuizResponseData(data, quizSessionQuestionRecord!.question),
		);

		return toGetQuizResponse(quizResponse);
	}

	private validateQuizSessionQuestionRecord(
		quizSessionQuestionRecord: QuizSessionQuestionLitePayload | null,
		sessionId: string,
		questionId: string,
	) {
		if (!quizSessionQuestionRecord) {
			throw new NotFoundException(
				`Question ${questionId} not found for session ${sessionId}`,
			);
		}

		if (
			quizSessionQuestionRecord.session.status !== QuizSessionStatus.IN_PROGRESS
		) {
			throw new ConflictException('Quiz session not in progress');
		}

		if (!quizSessionQuestionRecord.question) {
			throw new NotFoundException(`Question ${questionId} not found`);
		}
	}

	private getQuizResponseData(
		request: CreateQuizResponse,
		question: QuizSessionQuestionLitePayload['question'],
	): CreateQuizResponseInput {
		function getScore(difficulty: Difficulty) {
			switch (difficulty) {
				case Difficulty.SENIOR:
					return 3;
				case Difficulty.MID:
					return 2;
				default:
					return 1;
			}
		}

		function isQuestionAnsweredCorrectly(
			question: QuizSessionQuestionLitePayload['question'],
			userAnswers: CreateQuizResponse['answers'],
		): boolean {
			const correctAnswerIds = question.answerOptions
				.filter((answer) => answer.isCorrect)
				.map((answer) => answer.id);

			const userAnswerIds = Array.from(
				new Set(userAnswers.map((answer) => answer.answerOptionId)),
			);

			return (
				correctAnswerIds.length === userAnswerIds.length &&
				correctAnswerIds.every((correctAnswerId) =>
					userAnswerIds.includes(correctAnswerId),
				)
			);
		}

		return {
			questionId: request.questionId,
			sessionId: request.sessionId,
			feedback: request.feedback,
			answerOptionIds: request.answers,
			isCorrect: isQuestionAnsweredCorrectly(question, request.answers),
			score: getScore(question.difficulty),
			textAnswer: request.textAnswer,
		};
	}
}
