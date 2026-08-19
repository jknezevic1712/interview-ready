import { AnswerOption, Question } from 'src/common/types/client';

export interface CreateQuestionInput {
	categoryId: Question['categoryId'];
	text: Question['text'];
	type: Question['type'];
	difficulty: Question['difficulty'];
	answerOptions: {
		text: AnswerOption['text'];
		isCorrect: AnswerOption['isCorrect'];
	}[];
	explanation?: Question['explanation'];
	aiGenerated?: Question['aiGenerated'];
}
