import type { CreateQuizResponseAnswer } from 'src/common/dtos/quizSession/createQuizResponseAnswer.dto';

class CreateQuizResponseAnswerBuilder implements CreateQuizResponseAnswer {
	answerOptionId = 'answer-option-1';

	withAnswerOptionId(
		answerOptionId: CreateQuizResponseAnswer['answerOptionId'],
	) {
		this.answerOptionId = answerOptionId;
		return this;
	}

	build(): CreateQuizResponseAnswer {
		return {
			answerOptionId: this.answerOptionId,
		};
	}
}

export const buildCreateQuizResponseAnswer = () =>
	new CreateQuizResponseAnswerBuilder();
