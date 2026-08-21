import {
	BadRequestException,
	ConflictException,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { QUIZ_SESSION_REPOSITORY } from '../tokens/quizSession.token';
import type { IQuizSessionRepository } from '../contracts/quizSession.repository';
import { Difficulty, QuizSessionStatus } from 'src/common/types/client';
import { GetQuizSessionDto } from 'src/common/dtos/quizSession/getQuizSession.dto';
import {
	toGetQuizResponseDto,
	toGetQuizSessionDto,
	toGetQuizSessionLiteDto,
} from '../mappers/quizSession.mapper';
import { COMPLETION_STATUSES } from '../constants/completionStatuses';
import { GetQuizSessionLiteDto } from 'src/common/dtos/quizSession/getQuizSessionLite.dto';
import { CreateQuizResponseDto } from 'src/common/dtos/quizSession/createQuizResponse.dto';
import { GetQuizResponseDto } from 'src/common/dtos/quizSession/getQuizResponse.dto';
import { CreateQuizResponseInput } from '../types/createQuizResponse.input';
import { QuizSessionQuestionLitePayload } from '../utilities/quizSession.selects';

@Injectable()
export class QuizSessionService {
	constructor(
		@Inject(QUIZ_SESSION_REPOSITORY)
		private readonly quizSessionRepository: IQuizSessionRepository,
	) {}

	async getQuizSessions(userId: string): Promise<GetQuizSessionLiteDto[]> {
		const quizSessions =
			await this.quizSessionRepository.getQuizSessions(userId);
		return quizSessions.map(toGetQuizSessionLiteDto);
	}

	async getQuizSession(sessionId: string): Promise<GetQuizSessionDto> {
		const session = await this.quizSessionRepository.getQuizSession(sessionId);
		return toGetQuizSessionDto(session);
	}

	async createQuizSession(userId: string): Promise<GetQuizSessionLiteDto> {
		const session = await this.quizSessionRepository.createQuizSession(userId);
		return toGetQuizSessionLiteDto(session);
	}

	async updateQuizSessionStatus(
		sessionId: string,
		sessionStatus: QuizSessionStatus,
	): Promise<GetQuizSessionDto> {
		const quizSession =
			await this.quizSessionRepository.getQuizSession(sessionId);

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
			);
		return toGetQuizSessionDto(updatedSession);
	}

	async createQuizResponse(
		data: CreateQuizResponseDto,
	): Promise<GetQuizResponseDto> {
		const quizSessionQuestionRecord =
			await this.quizSessionRepository.getQuizSessionQuestionRecordLite(
				data.sessionId,
				data.questionId,
			);

		this.validateQuizSessionQuestionRecord(
			quizSessionQuestionRecord,
			data.sessionId,
			data.questionId,
		);

		const quizResponse = await this.quizSessionRepository.createQuizResponse(
			this.getQuizResponseData(data, quizSessionQuestionRecord!.question),
		);

		return toGetQuizResponseDto(quizResponse);
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
		request: CreateQuizResponseDto,
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
			userAnswers: CreateQuizResponseDto['answers'],
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
