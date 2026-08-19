import { QuestionsPayload } from '../utilities/questions.selects';
import { CreateQuestionInput } from '../types/createQuestion.input';
import { UpdateQuestionInput } from '../types/updateQuestion.input';

export interface IQuestionsRepository {
	getQuestions(sessionId: string): Promise<QuestionsPayload[]>;
	createQuestion(data: CreateQuestionInput): Promise<QuestionsPayload>;
	updateQuestion(data: UpdateQuestionInput): Promise<QuestionsPayload>;
	linkQuestion(sessionId: string, questionId: string): Promise<void>;
	unlinkQuestion(sessionId: string, questionId: string): Promise<void>;
	canArchiveQuestion(questionId: string): Promise<boolean>;
	archiveQuestion(questionId: string): Promise<void>;
}
