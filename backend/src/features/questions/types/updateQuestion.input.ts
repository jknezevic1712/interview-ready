import { Question } from 'src/common/types/client';
import { CreateQuestionInput } from './createQuestion.input';

export interface UpdateQuestionInput extends CreateQuestionInput {
	questionId: Question['id'];
}
