import type { GetQuizResponseDto } from 'src/common/dtos/quizSession/getQuizResponse.dto';

class GetQuizResponseBuilder implements GetQuizResponseDto {
	id = 'quiz-response-1';
	answeredAt = new Date(Date.now());
	isCorrect: GetQuizResponseDto['isCorrect'] = null;
	score: GetQuizResponseDto['score'] = null;

	withId(id: GetQuizResponseDto['id']) {
		this.id = id;
		return this;
	}

	withAnsweredAt(answeredAt: GetQuizResponseDto['answeredAt']) {
		this.answeredAt = answeredAt;
		return this;
	}

	withIsCorrect(isCorrect: GetQuizResponseDto['isCorrect']) {
		this.isCorrect = isCorrect;
		return this;
	}

	withScore(score: GetQuizResponseDto['score']) {
		this.score = score;
		return this;
	}

	build(): GetQuizResponseDto {
		return {
			id: this.id,
			answeredAt: this.answeredAt,
			isCorrect: this.isCorrect,
			score: this.score,
		};
	}
}

export const buildGetQuizResponse = () => new GetQuizResponseBuilder();
