import { QuizResponse, QuizResponseAnswer } from 'src/common/types/client';

export interface CreateQuizResponseInput {
	sessionId: QuizResponse['sessionId'];
	questionId: QuizResponse['questionId'];
	textAnswer: QuizResponse['textAnswer'];
	answerOptionIds: Pick<QuizResponseAnswer, 'answerOptionId'>[];
	isCorrect: QuizResponse['isCorrect'];
	score: QuizResponse['score'];
	feedback: QuizResponse['feedback'];
}
