import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { QUIZ_SESSION_REPOSITORY } from './tokens/quizSession.token';
import type { IQuizSessionRepository } from './contracts/quizSession.repository';
import { QuizSession, QuizSessionStatus } from 'src/types/client';

@Injectable()
export class QuizSessionService {
	constructor(
		@Inject(QUIZ_SESSION_REPOSITORY)
		private readonly quizRepository: IQuizSessionRepository,
	) {}

	getQuizSessions(userId: string): Promise<QuizSession[]> {
		return this.quizRepository.getQuizSessions(userId);
	}

	getQuizSession(quizSessionId: string): Promise<QuizSession> {
		return this.quizRepository.getQuizSession(quizSessionId);
	}

	createQuizSession(userId: string): Promise<QuizSession> {
		return this.quizRepository.createQuizSession(userId);
	}

	updateQuizSessionStatus(
		quizSessionId: string,
		quizSessionStatus: QuizSession['status'],
	): Promise<QuizSession> {
		if (quizSessionStatus !== QuizSessionStatus.IN_PROGRESS) {
			throw new ForbiddenException(
				'Updating quiz session not in progress prohibited',
			);
		}

		return this.quizRepository.updateQuizSessionStatus(
			quizSessionId,
			quizSessionStatus,
		);
	}
}
