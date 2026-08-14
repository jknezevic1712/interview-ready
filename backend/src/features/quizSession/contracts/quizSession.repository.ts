import { QuizSession } from 'src/types/client';

export interface IQuizSessionRepository {
	getQuizSessions(userId: string): Promise<QuizSession[]>;
	getQuizSession(quizSessionId: string): Promise<QuizSession>;
	createQuizSession(userId: string): Promise<QuizSession>;
	updateQuizSession(quizSession: QuizSession): Promise<QuizSession>;
}
