import {
	AnswerOption,
	Category,
	Question,
	QuizResponse,
} from 'src/common/types/client';

export class GetQuestionDto {
	id!: Question['id'];
	text!: Question['text'];
	explanation!: Question['explanation'];
	type!: Question['type'];
	difficulty!: Question['difficulty'];
	aiGenerated!: Question['aiGenerated'];
	category!: {
		id: Category['id'];
		name: Category['name'];
		slug: Category['slug'];
	};
	answerOptions!: AnswerOption[];
	responses!: QuizResponse[];
	createdAt!: Question['createdAt'];
	updatedAt!: Question['updatedAt'];
}
