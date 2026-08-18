import { QuizSessionStatus } from 'src/common/types/enums';
import { QuizSessionWithUser } from '../quizSession.selects';

export interface IQuizSessionRepository {
	getQuizSessions(userId: string): Promise<QuizSessionWithUser[]>;
	getQuizSession(quizSessionId: string): Promise<QuizSessionWithUser>;
	createQuizSession(userId: string): Promise<QuizSessionWithUser>;
	updateQuizSessionStatus(
		quizSessionId: string,
		quizSessionStatus: QuizSessionStatus,
	): Promise<QuizSessionWithUser>;
}
