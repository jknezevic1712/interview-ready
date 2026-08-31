import { buildCreateQuizResponseAnswer } from './createQuizResponseAnswer.builder';

import type { CreateQuizResponse } from 'src/common/dtos/quizSession/createQuizResponse.dto';
import type { CreateQuizResponseAnswer } from 'src/common/dtos/quizSession/createQuizResponseAnswer.dto';

export class CreateQuizResponseBuilder implements CreateQuizResponse {
	sessionId = '12345678';
	questionId = 'qwertzuiop';
	textAnswer: CreateQuizResponse['textAnswer'] = null;
	answers: CreateQuizResponseAnswer[] = [
		buildCreateQuizResponseAnswer().build(),
	];
	feedback: CreateQuizResponse['feedback'] = 'Lorem ipsum';

	withSessionId(sessionId: CreateQuizResponse['sessionId']) {
		this.sessionId = sessionId;
		return this;
	}

	withQuestionId(questionId: CreateQuizResponse['questionId']) {
		this.questionId = questionId;
		return this;
	}

	withTextAnswer(textAnswer: CreateQuizResponse['textAnswer']) {
		this.textAnswer = textAnswer;
		return this;
	}

	withAnswers(answers: CreateQuizResponse['answers']) {
		this.answers = answers;
		return this;
	}

	withFeedback(feedback: CreateQuizResponse['feedback']) {
		this.feedback = feedback;
		return this;
	}

	build(): CreateQuizResponse {
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
