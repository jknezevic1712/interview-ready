import {
	AnswerOption,
	Category,
	Question,
	QuizResponseAnswer,
} from 'src/common/types/client';
import { GetQuizSessionBaseResponse } from './getQuizSessionBaseResponse.dto';

export class GetQuizSessionResponse extends GetQuizSessionBaseResponse {
	responses!: {
		id: string;
		textAnswer: string | null;
		isCorrect: boolean | null;
		score: number | null;
		feedback: string | null;
		answeredAt: Date;
		question: {
			id: Question['id'];
			text: Question['text'];
			explanation: Question['explanation'];
			type: Question['type'];
			difficulty: Question['difficulty'];
			aiGenerated: Question['aiGenerated'];
			createdAt: Question['createdAt'];
			updatedAt: Question['updatedAt'];
			category: {
				id: Category['id'];
				name: Category['name'];
				slug: Category['slug'];
			};
			answerOptions: {
				id: AnswerOption['id'];
				isCorrect: AnswerOption['isCorrect'];
				text: AnswerOption['text'];
			}[];
		};
		answersIds: QuizResponseAnswer['answerOptionId'][];
	}[];
}
