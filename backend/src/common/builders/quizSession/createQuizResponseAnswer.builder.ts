import type { CreateQuizResponseAnswerDto } from 'src/common/dtos/quizSession/createQuizResponseAnswer.dto';

class CreateQuizResponseAnswerBuilder implements CreateQuizResponseAnswerDto {
	answerOptionId = 'answer-option-1';

	withAnswerOptionId(
		answerOptionId: CreateQuizResponseAnswerDto['answerOptionId'],
	) {
		this.answerOptionId = answerOptionId;
		return this;
	}

	build(): CreateQuizResponseAnswerDto {
		return {
			answerOptionId: this.answerOptionId,
		};
	}
}

export const buildCreateQuizResponseAnswer = () =>
	new CreateQuizResponseAnswerBuilder();
