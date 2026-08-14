import { QuizSession } from 'src/types/client';

export interface IQuizSessionRepository {
	getQuizSessions(userId: string): Promise<QuizSession[]>;
	getQuizSession(quizSessionId: string): Promise<QuizSession>;
	createQuizSession(userId: string): Promise<QuizSession>;
	updateQuizSessionStatus(
		quizSessionId: string,
		quizSessionStatus: QuizSession['status'],
	): Promise<QuizSession>;
}
