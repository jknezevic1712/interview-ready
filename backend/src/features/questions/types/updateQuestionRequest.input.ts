import { Question } from 'src/common/types/client';
import { CreateQuestionRequestInput } from './createQuestionRequest.input';

export interface UpdateQuestionRequestInput extends CreateQuestionRequestInput {
	questionId: Question['id'];
}
