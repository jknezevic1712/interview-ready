import { QuizResponse } from 'src/common/types/client';

export class GetQuizResponse {
	id!: QuizResponse['id'];
	isCorrect!: QuizResponse['isCorrect'];
	score!: QuizResponse['score'];
	answeredAt!: QuizResponse['answeredAt'];
}
