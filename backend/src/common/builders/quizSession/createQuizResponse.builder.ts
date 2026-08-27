import { buildCreateQuizResponseAnswer } from './createQuizResponseAnswer.builder';

import type { CreateQuizResponseDto } from 'src/common/dtos/quizSession/createQuizResponse.dto';
import type { CreateQuizResponseAnswerDto } from 'src/common/dtos/quizSession/createQuizResponseAnswer.dto';

export class CreateQuizResponseBuilder implements CreateQuizResponseDto {
	sessionId = '12345678';
	questionId = 'qwertzuiop';
	textAnswer: CreateQuizResponseDto['textAnswer'] = null;
	answers: CreateQuizResponseAnswerDto[] = [
		buildCreateQuizResponseAnswer().build(),
	];
	feedback: CreateQuizResponseDto['feedback'] = 'Lorem ipsum';

	withSessionId(sessionId: CreateQuizResponseDto['sessionId']) {
		this.sessionId = sessionId;
		return this;
	}

	withQuestionId(questionId: CreateQuizResponseDto['questionId']) {
		this.questionId = questionId;
		return this;
	}

	withTextAnswer(textAnswer: CreateQuizResponseDto['textAnswer']) {
		this.textAnswer = textAnswer;
		return this;
	}

	withAnswers(answers: CreateQuizResponseDto['answers']) {
		this.answers = answers;
		return this;
	}

	withFeedback(feedback: CreateQuizResponseDto['feedback']) {
		this.feedback = feedback;
		return this;
	}

	build(): CreateQuizResponseDto {
		return {
			sessionId: this.sessionId,
			questionId: this.questionId,
			textAnswer: this.textAnswer,
			answers: this.answers,
			feedback: this.feedback,
		};
	}
}

export const buildCreateQuizResponse = () => new CreateQuizResponseBuilder();
