import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { QUIZ_SESSION_REPOSITORY } from './tokens/quizSession.token';
import type { IQuizSessionRepository } from './contracts/quizSession.repository';
import { QuizSession, QuizSessionStatus } from 'src/common/types/client';
import { GetQuizSessionDto } from 'src/common/DTO/quizSession/getQuizSession.dto';

@Injectable()
export class QuizSessionService {
	constructor(
		@Inject(QUIZ_SESSION_REPOSITORY)
		private readonly quizRepository: IQuizSessionRepository,
	) {}

	getQuizSessions(userId: string): Promise<GetQuizSessionDto[]> {
		return this.quizRepository.getQuizSessions(userId);
	}

	getQuizSession(quizSessionId: string): Promise<GetQuizSessionDto> {
		return this.quizRepository.getQuizSession(quizSessionId);
	}

	createQuizSession(userId: string): Promise<GetQuizSessionDto> {
		return this.quizRepository.createQuizSession(userId);
	}

	async updateQuizSessionStatus(
		quizSessionId: string,
		quizSessionStatus: QuizSession['status'],
	): Promise<GetQuizSessionDto> {
		const targetQuizSession =
			await this.quizRepository.getQuizSession(quizSessionId);

		if (targetQuizSession.status === quizSessionStatus) {
			throw new ConflictException('Quiz session already has this status');
		}

		const allowedStatuses: QuizSessionStatus[] = [
			QuizSessionStatus.COMPLETED,
			QuizSessionStatus.ABANDONED,
		];

		if (!allowedStatuses.includes(quizSessionStatus)) {
			throw new ConflictException('Quiz session is not in progress');
		}

		return this.quizRepository.updateQuizSessionStatus(
			quizSessionId,
			quizSessionStatus,
		);
	}
}
