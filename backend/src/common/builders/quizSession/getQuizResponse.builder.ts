import type { GetQuizResponse } from 'src/common/dtos/quizSession/getQuizResponse.dto';

class GetQuizResponseBuilder implements GetQuizResponse {
	id = 'quiz-response-1';
	answeredAt = new Date(Date.now());
	isCorrect: GetQuizResponse['isCorrect'] = null;
	score: GetQuizResponse['score'] = null;

	withId(id: GetQuizResponse['id']) {
		this.id = id;
		return this;
	}

	withAnsweredAt(answeredAt: GetQuizResponse['answeredAt']) {
		this.answeredAt = answeredAt;
		return this;
	}

	withIsCorrect(isCorrect: GetQuizResponse['isCorrect']) {
		this.isCorrect = isCorrect;
		return this;
	}

	withScore(score: GetQuizResponse['score']) {
		this.score = score;
		return this;
	}

	build(): GetQuizResponse {
		return {
			id: this.id,
			answeredAt: this.answeredAt,
			isCorrect: this.isCorrect,
			score: this.score,
		};
	}
}

export const buildGetQuizResponse = () => new GetQuizResponseBuilder();
