import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { AnswerOption } from 'src/common/types/client';

export class CreateAnswerOption {
	@IsString()
	@IsNotEmpty()
	text!: AnswerOption['text'];

	@IsBoolean()
	isCorrect!: AnswerOption['isCorrect'];
}
