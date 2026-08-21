import { ApiProperty } from '@nestjs/swagger';
import {
	ArrayMinSize,
	IsArray,
	IsBoolean,
	IsEnum,
	IsOptional,
	IsString,
	Matches,
	ValidateNested,
} from 'class-validator';
import { Difficulty, QuestionType } from 'src/common/types/enums';
import { CreateAnswerOptionDto } from './createAnswerOption.dto';
import { Type } from 'class-transformer';

export class CreateQuestionDto {
	@IsString()
	@Matches(/^[a-z0-9]{24,}$/, {
		message: 'Invalid category id',
	})
	categoryId!: string;

	@IsString()
	text!: string;

	@IsEnum(QuestionType)
	type!: QuestionType;

	@IsEnum(Difficulty)
	difficulty!: Difficulty;

	@ApiProperty({
		type: () => CreateAnswerOptionDto,
		isArray: true,
	})
	@IsArray()
	@ArrayMinSize(2, { message: 'Minimum of two answer options must be added' })
	@ValidateNested({ each: true })
	@Type(() => CreateAnswerOptionDto)
	answerOptions!: CreateAnswerOptionDto[];

	@IsOptional()
	@IsString()
	explanation?: string;

	@IsOptional()
	@IsBoolean()
	aiGenerated?: boolean;
}
