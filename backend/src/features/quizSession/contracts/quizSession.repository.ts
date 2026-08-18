import { QuizSessionStatus } from 'src/common/types/enums';
import {
	QuizSessionPayload,
	QuizSessionWithUser,
} from '../utilities/quizSession.selects';

export interface IQuizSessionRepository {
	getQuizSessions(userId: string): Promise<QuizSessionWithUser[]>;
	getQuizSession(quizSessionId: string): Promise<QuizSessionPayload>;
	createQuizSession(userId: string): Promise<QuizSessionWithUser>;
	updateQuizSessionStatus(
		quizSessionId: string,
		quizSessionStatus: QuizSessionStatus,
	): Promise<QuizSessionWithUser>;
}
