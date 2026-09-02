import { ApiProperty } from '@nestjs/swagger';
import { AnswerOption, Category, Question } from 'src/common/types/client';

export class GetQuestionResponse {
	id!: Question['id'];
	text!: Question['text'];

	@ApiProperty({
		type: String,
		nullable: true,
	})
	explanation!: Question['explanation'];

	type!: Question['type'];
	difficulty!: Question['difficulty'];
	aiGenerated!: Question['aiGenerated'];
	category!: {
		id: Category['id'];
		name: Category['name'];
		slug: Category['slug'];
	};
	answerOptions!: {
		id: AnswerOption['id'];
		text: AnswerOption['text'];
		isCorrect: AnswerOption['isCorrect'];
	}[];
}
