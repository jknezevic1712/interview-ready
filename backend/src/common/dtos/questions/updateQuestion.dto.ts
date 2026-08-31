import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { CreateQuestion } from './createQuestion.dto';

export class UpdateQuestion extends CreateQuestion {
	@IsString()
	@Matches(/^[a-z0-9]{24,}$/, {
		message: 'Invalid question id',
	})
	@IsNotEmpty()
	questionId!: string;
}
