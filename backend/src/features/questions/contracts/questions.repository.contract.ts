import { CreateQuestionRequestInput } from '../types/createQuestionRequest.input';
import { UpdateQuestionRequestInput } from '../types/updateQuestionRequest.input';
import { QuestionPayload } from '../utilities/question.selects';

export interface IQuestionsRepository {
	getQuestions(sessionId: string, userId: string): Promise<QuestionPayload[]>;
	createQuestionRequest(
		data: CreateQuestionRequestInput,
	): Promise<QuestionPayload>;
	updateQuestion(data: UpdateQuestionRequestInput): Promise<QuestionPayload>;
	linkQuestion(sessionId: string, questionId: string): Promise<void>;
	unlinkQuestion(sessionId: string, questionId: string): Promise<void>;
	canArchiveQuestion(questionId: string): Promise<boolean>;
	archiveQuestion(questionId: string): Promise<void>;
}
