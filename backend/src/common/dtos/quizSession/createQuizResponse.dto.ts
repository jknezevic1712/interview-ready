import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsNotEmpty,
	IsString,
	Matches,
	ValidateNested,
} from 'class-validator';
import { CreateQuizResponseAnswer } from './createQuizResponseAnswer.dto';

export class CreateQuizResponse {
	@IsString()
	@Matches(/^[a-z0-9]{24,}$/, {
		message: 'Invalid session id',
	})
	@IsNotEmpty()
	sessionId!: string;

	@IsString()
	@Matches(/^[a-z0-9]{24,}$/, {
		message: 'Invalid question id',
	})
	@IsNotEmpty()
	questionId!: string;

	@ApiProperty({
		type: () => CreateQuizResponseAnswer,
		isArray: true,
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateQuizResponseAnswer)
	answers!: CreateQuizResponseAnswer[];

	@IsString()
	textAnswer!: string | null;

	@IsString()
	feedback!: string | null;
}
