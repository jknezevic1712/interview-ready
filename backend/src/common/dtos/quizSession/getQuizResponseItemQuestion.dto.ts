import type { Question } from 'src/common/types/client';
import type { GetQuizResponseItemQuestionAnswerOption } from './getQuizResponseItemQuestionAnswerOption.dto';
import type { GetQuizResponseItemQuestionCategory } from './getQuizResponseItemQuestionCategory.dto';

export class GetQuizResponseItemQuestion {
	id!: Question['id'];
	text!: Question['text'];
	explanation!: Question['explanation'];
	type!: Question['type'];
	difficulty!: Question['difficulty'];
	aiGenerated!: Question['aiGenerated'];
	createdAt!: Question['createdAt'];
	updatedAt!: Question['updatedAt'];
	category!: GetQuizResponseItemQuestionCategory;
	answerOptions!: GetQuizResponseItemQuestionAnswerOption[];
}
