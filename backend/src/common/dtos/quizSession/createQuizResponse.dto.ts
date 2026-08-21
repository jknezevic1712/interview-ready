import { ApiProperty } from '@nestjs/swagger';
import {
	IsArray,
	IsOptional,
	IsString,
	Matches,
	ValidateNested,
} from 'class-validator';
import { CreateQuizResponseAnswerDto } from './createQuizResponseAnswer.dto';
import { Type } from 'class-transformer';

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
