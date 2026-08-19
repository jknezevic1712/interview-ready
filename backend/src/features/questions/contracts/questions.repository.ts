import { QuestionsPayload } from '../utilities/questions.selects';

export interface IQuestionsRepository {
	getQuestions(sessionId: string): Promise<QuestionsPayload[]>;
}
