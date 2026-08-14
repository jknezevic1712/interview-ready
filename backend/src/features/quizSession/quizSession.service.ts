import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { QUIZ_SESSION_REPOSITORY } from './tokens/quizSession.token';
import type { IQuizSessionRepository } from './contracts/quizSession.repository';
import { QuizSession, QuizSessionStatus } from 'src/types/prisma/client';

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

	updateQuizSession(quizSession: QuizSession): Promise<QuizSession> {
		if (quizSession.status !== QuizSessionStatus.IN_PROGRESS) {
			throw new ForbiddenException(
				'Updating quiz session not in progress prohibited',
			);
		}

		return this.quizRepository.updateQuizSession(quizSession);
	}
}
