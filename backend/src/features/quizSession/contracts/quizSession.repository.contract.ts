import { QuizResponse } from 'src/common/types/client';
import { QuizSessionStatus } from 'src/common/types/enums';
import { CreateQuizResponseInput } from '../types/createQuizResponse.input';
import {
	QuizSessionLitePayload,
	QuizSessionPayload,
	QuizSessionQuestionLitePayload,
} from '../utilities/quizSession.selects';

export interface IQuizSessionRepository {
	getQuizSessions(userId: string): Promise<QuizSessionLitePayload[]>;
	getQuizSession(
		sessionId: string,
		userId: string,
	): Promise<QuizSessionPayload | null>;
	createQuizSession(userId: string): Promise<QuizSessionLitePayload>;
	updateQuizSessionStatus(
		sessionId: string,
		sessionStatus: QuizSessionStatus,
		userId: string,
	): Promise<QuizSessionPayload>;
	getQuizSessionQuestionRecordLite(
		sessionId: string,
		questionId: string,
		userId: string,
	): Promise<QuizSessionQuestionLitePayload | null>;
	createQuizResponse(data: CreateQuizResponseInput): Promise<QuizResponse>;
}
