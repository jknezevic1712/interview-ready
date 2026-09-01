import { buildCreateQuizResponseAnswerRequest } from './createQuizResponseAnswerRequest.builder';

import type { CreateQuizResponseAnswerRequest } from 'src/common/dtos/quizSession/createQuizResponseAnswerRequest.dto';
import type { CreateQuizResponseRequest } from 'src/common/dtos/quizSession/createQuizResponseRequest.dto';

export class CreateQuizResponseRequestBuilder
	implements CreateQuizResponseRequest
{
	sessionId = '12345678';
	questionId = 'qwertzuiop';
	textAnswer: CreateQuizResponseRequest['textAnswer'] = null;
	answers: CreateQuizResponseAnswerRequest[] = [
		buildCreateQuizResponseAnswerRequest().build(),
	];
	feedback: CreateQuizResponseRequest['feedback'] = 'Lorem ipsum';

	withSessionId(sessionId: CreateQuizResponseRequest['sessionId']) {
		this.sessionId = sessionId;
		return this;
	}

	withQuestionId(questionId: CreateQuizResponseRequest['questionId']) {
		this.questionId = questionId;
		return this;
	}

	withTextAnswer(textAnswer: CreateQuizResponseRequest['textAnswer']) {
		this.textAnswer = textAnswer;
		return this;
	}

	withAnswers(answers: CreateQuizResponseRequest['answers']) {
		this.answers = answers;
		return this;
	}

	withFeedback(feedback: CreateQuizResponseRequest['feedback']) {
		this.feedback = feedback;
		return this;
	}

	build(): CreateQuizResponseRequest {
		return {
			sessionId: this.sessionId,
			questionId: this.questionId,
			textAnswer: this.textAnswer,
			answers: this.answers,
			feedback: this.feedback,
		};
	}
}

export const buildCreateQuizResponseRequest = () =>
	new CreateQuizResponseRequestBuilder();
