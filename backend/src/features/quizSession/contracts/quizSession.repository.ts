import { QuizSessionStatus } from 'src/common/types/enums';
import {
	QuizSessionLitePayload,
	QuizSessionPayload,
} from '../utilities/quizSession.selects';

export interface IQuizSessionRepository {
	getQuizSessions(userId: string): Promise<QuizSessionLitePayload[]>;
	getQuizSession(sessionId: string): Promise<QuizSessionPayload>;
	createQuizSession(userId: string): Promise<QuizSessionLitePayload>;
	updateQuizSessionStatus(
		sessionId: string,
		sessionStatus: QuizSessionStatus,
	): Promise<QuizSessionPayload>;
}
