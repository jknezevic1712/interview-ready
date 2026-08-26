import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, Matches, ValidateNested } from 'class-validator';
import { CreateQuizResponseAnswerDto } from './createQuizResponseAnswer.dto';

export class CreateQuizResponseDto {
	@IsString()
	@Matches(/^[a-z0-9]{24,}$/, {
		message: 'Invalid session id',
	})
	sessionId!: string;

	@IsString()
	@Matches(/^[a-z0-9]{24,}$/, {
		message: 'Invalid question id',
	})
	questionId!: string;

	@ApiProperty({
		type: () => CreateQuizResponseAnswerDto,
		isArray: true,
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateQuizResponseAnswerDto)
	answers!: CreateQuizResponseAnswerDto[];

	@IsString()
	textAnswer!: string | null;

	@IsString()
	feedback!: string | null;
}
