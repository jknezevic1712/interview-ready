import {
	QuestionLinkPayload,
	QuestionsPayload,
} from '../utilities/questions.selects';

export interface IQuestionsRepository {
	getQuestions(sessionId: string): Promise<QuestionsPayload[]>;
	linkQuestion(
		sessionId: string,
		questionId: string,
	): Promise<QuestionLinkPayload>;
	unlinkQuestion(
		sessionId: string,
		questionId: string,
	): Promise<QuestionLinkPayload>;
	canArchiveQuestion(questionId: string): Promise<boolean>;
	archiveQuestion(questionId: string): Promise<void>;
}
