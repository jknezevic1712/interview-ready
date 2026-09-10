import { QuizResponse } from 'src/common/types/client';
import { CreateQuizResponseInput } from '../types/createQuizResponse.input';
import {
	QuizSessionLitePayload,
	QuizSessionPayload,
	QuizSessionQuestionLitePayload,
} from '../utilities/quizSession.selects';

import type {
	QuizSessionCreateInput,
	QuizSessionUpdateInput,
} from 'src/common/types/models';

export interface IQuizSessionRepository {
	getQuizSessions(userId: string): Promise<QuizSessionLitePayload[]>;
	getQuizSession(
		sessionId: string,
		userId: string,
	): Promise<QuizSessionPayload | null>;
	createQuizSession(
		data: Pick<QuizSessionCreateInput, 'title'>,
		userId: string,
	): Promise<QuizSessionLitePayload>;
	updateQuizSession(
		sessionId: string,
		data: Pick<QuizSessionUpdateInput, 'title' | 'status'>,
		userId: string,
	): Promise<QuizSessionPayload>;
	getQuizSessionQuestionRecordLite(
		sessionId: string,
		questionId: string,
		userId: string,
	): Promise<QuizSessionQuestionLitePayload | null>;
	createQuizResponse(data: CreateQuizResponseInput): Promise<QuizResponse>;
}
