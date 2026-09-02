import { buildGetQuizResponseItemQuestion } from './getQuizResponseItemQuestion.builder';

import type { GetQuizResponseItem } from 'src/common/dtos/quizSession/getQuizResponseItem.dto';

class GetQuizResponseItemBuilder implements GetQuizResponseItem {
	id: GetQuizResponseItem['id'] = 'quiz-response-item-1';
	textAnswer: GetQuizResponseItem['textAnswer'] = null;
	isCorrect: GetQuizResponseItem['isCorrect'] = false;
	score: GetQuizResponseItem['score'] = null;
	feedback: GetQuizResponseItem['feedback'] = null;
	answeredAt: GetQuizResponseItem['answeredAt'] = new Date(Date.now());
	question: GetQuizResponseItem['question'] = buildGetQuizResponseItemQuestion().build();
	answersIds: GetQuizResponseItem['answersIds'] = [];

	withId(id: GetQuizResponseItem['id']) {
		this.id = id;
		return this;
	}

	withTextAnswer(textAnswer: GetQuizResponseItem['textAnswer']) {
		this.textAnswer = textAnswer;
		return this;
	}

	withIsCorrect(isCorrect: GetQuizResponseItem['isCorrect']) {
		this.isCorrect = isCorrect;
		return this;
	}

	withScore(score: GetQuizResponseItem['score']) {
		this.score = score;
		return this;
	}

	withFeedback(feedback: GetQuizResponseItem['feedback']) {
		this.feedback = feedback;
		return this;
	}

	withAnsweredAt(answeredAt: GetQuizResponseItem['answeredAt']) {
		this.answeredAt = answeredAt;
		return this;
	}

	withQuestion(question: GetQuizResponseItem['question']) {
		this.question = question;
		return this;
	}

	withAnswersIds(answersIds: GetQuizResponseItem['answersIds']) {
		this.answersIds = answersIds;
		return this;
	}

	build(): GetQuizResponseItem {
		return {
			id: this.id,
			textAnswer: this.textAnswer,
			isCorrect: this.isCorrect,
			score: this.score,
			feedback: this.feedback,
			answeredAt: this.answeredAt,
			question: this.question,
			answersIds: this.answersIds,
		};
	}
}

export const buildGetQuizResponseItem = () => new GetQuizResponseItemBuilder();