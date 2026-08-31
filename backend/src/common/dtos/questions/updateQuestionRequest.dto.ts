import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { CreateQuestionRequest } from './createQuestionRequest.dto';

export class UpdateQuestionRequest extends CreateQuestionRequest {
	@IsString()
	@Matches(/^[a-z0-9]{24,}$/, {
		message: 'Invalid question id',
	})
	@IsNotEmpty()
	questionId!: string;
}
