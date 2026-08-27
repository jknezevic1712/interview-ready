import { CreateQuestionInput } from '../types/createQuestion.input';
import { UpdateQuestionInput } from '../types/updateQuestion.input';
import { QuestionPayload } from '../utilities/question.selects';

export interface IQuestionsRepository {
	getQuestions(sessionId: string, userId: string): Promise<QuestionPayload[]>;
	createQuestion(data: CreateQuestionInput): Promise<QuestionPayload>;
	updateQuestion(data: UpdateQuestionInput): Promise<QuestionPayload>;
	linkQuestion(sessionId: string, questionId: string): Promise<void>;
	unlinkQuestion(sessionId: string, questionId: string): Promise<void>;
	canArchiveQuestion(questionId: string): Promise<boolean>;
	archiveQuestion(questionId: string): Promise<void>;
}
