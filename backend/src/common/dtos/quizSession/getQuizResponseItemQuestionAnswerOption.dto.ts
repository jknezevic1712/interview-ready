import type { AnswerOption } from 'src/common/types/client';

export class GetQuizResponseItemQuestionAnswerOption {
	id!: AnswerOption['id'];
	isCorrect!: AnswerOption['isCorrect'];
	text!: AnswerOption['text'];
}
