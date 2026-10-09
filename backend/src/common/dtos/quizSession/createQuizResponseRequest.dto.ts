import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsNotEmpty,
	IsString,
	Matches,
	ValidateNested,
} from 'class-validator';
import { IsStringOrNull } from 'src/common/decorators/isStringOrNull.decorator';
import { CreateQuizResponseAnswerRequest } from './createQuizResponseAnswerRequest.dto';

export class CreateQuizResponseRequest {
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
		type: () => CreateQuizResponseAnswerRequest,
		isArray: true,
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateQuizResponseAnswerRequest)
	answers!: CreateQuizResponseAnswerRequest[];

	@IsStringOrNull()
	textAnswer!: string | null;

	@IsStringOrNull()
	feedback!: string | null;
}
