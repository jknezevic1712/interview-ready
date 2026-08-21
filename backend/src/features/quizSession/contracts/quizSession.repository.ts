import { QuizSessionStatus } from 'src/common/types/enums';
import {
	QuizSessionLitePayload,
	QuizSessionPayload,
	QuizSessionQuestionLitePayload,
} from '../utilities/quizSession.selects';
import { CreateQuizResponseInput } from '../types/createQuizResponse.input';
import { QuizResponse } from 'src/common/types/client';

export interface IQuizSessionRepository {
	getQuizSessions(userId: string): Promise<QuizSessionLitePayload[]>;
	getQuizSession(sessionId: string): Promise<QuizSessionPayload>;
	createQuizSession(userId: string): Promise<QuizSessionLitePayload>;
	updateQuizSessionStatus(
		sessionId: string,
		sessionStatus: QuizSessionStatus,
	): Promise<QuizSessionPayload>;
	getQuizSessionQuestionRecordLite(
		sessionId: string,
		questionId: string,
	): Promise<QuizSessionQuestionLitePayload | null>;
	createQuizResponse(data: CreateQuizResponseInput): Promise<QuizResponse>;
}
