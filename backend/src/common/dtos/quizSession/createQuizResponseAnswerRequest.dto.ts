import { IsOptional, IsString, Matches } from 'class-validator';

export class CreateQuizResponseAnswerRequest {
	@IsOptional()
	@IsString()
	@Matches(/^[a-z0-9]{24,}$/, {
		message: 'Invalid answer option id',
	})
	answerOptionId!: string;
}
