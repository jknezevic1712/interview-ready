import { Question } from 'src/common/types/client';
import { CreateQuestionRequestInput } from './createQuestion.input';

export interface UpdateQuestionInput extends CreateQuestionRequestInput {
	questionId: Question['id'];
}
