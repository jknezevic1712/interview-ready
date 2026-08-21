import { IsString, Matches } from 'class-validator';
import { CreateQuestionDto } from './createQuestion.dto';

export class UpdateQuestionDto extends CreateQuestionDto {
	@IsString()
	@Matches(/^[a-z0-9]{24,}$/, {
		message: 'Invalid question id',
	})
	questionId!: string;
}
