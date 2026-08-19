import { QuizSessionStatus } from 'src/common/types/enums';
import { QuizSessionPayload } from '../utilities/quizSession.selects';

export interface IQuizSessionRepository {
	getQuizSessions(userId: string): Promise<QuizSessionPayload[]>;
	getQuizSession(quizSessionId: string): Promise<QuizSessionPayload>;
	createQuizSession(userId: string): Promise<QuizSessionPayload>;
	updateQuizSessionStatus(
		quizSessionId: string,
		quizSessionStatus: QuizSessionStatus,
	): Promise<QuizSessionPayload>;
}
