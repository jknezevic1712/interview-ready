import { IsBoolean, IsString } from 'class-validator';
import { AnswerOption } from 'src/common/types/client';

export class CreateAnswerOptionDto {
	@IsString()
	text!: AnswerOption['text'];

	@IsBoolean()
	isCorrect!: AnswerOption['isCorrect'];
}
