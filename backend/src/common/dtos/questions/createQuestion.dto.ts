import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	ArrayMinSize,
	IsArray,
	IsBoolean,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	Matches,
	ValidateNested,
} from 'class-validator';
import { Difficulty, QuestionType } from 'src/common/types/enums';
import { CreateAnswerOption } from './createAnswerOption.dto';

export class CreateQuestion {
	@IsString()
	@Matches(/^[a-z0-9]{24,}$/, {
		message: 'Invalid category id',
	})
	@IsNotEmpty()
	categoryId!: string;

	@IsString()
	@IsNotEmpty()
	text!: string;

	@IsEnum(QuestionType)
	type!: QuestionType;

	@IsEnum(Difficulty)
	difficulty!: Difficulty;

	@ApiProperty({
		type: () => CreateAnswerOption,
		isArray: true,
	})
	@IsArray()
	@ArrayMinSize(2, { message: 'Minimum of two answer options must be added' })
	@ValidateNested({ each: true })
	@Type(() => CreateAnswerOption)
	answerOptions!: CreateAnswerOption[];

	@IsOptional()
	@IsString()
	explanation?: string;

	@IsOptional()
	@IsBoolean()
	aiGenerated?: boolean;
}
