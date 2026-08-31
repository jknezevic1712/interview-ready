import type { CreateQuizResponseAnswerRequest } from 'src/common/dtos/quizSession/createQuizResponseAnswerRequest.dto';

class CreateQuizResponseAnswerBuilder
	implements CreateQuizResponseAnswerRequest
{
	answerOptionId = 'answer-option-1';

	withAnswerOptionId(
		answerOptionId: CreateQuizResponseAnswerRequest['answerOptionId'],
	) {
		this.answerOptionId = answerOptionId;
		return this;
	}

	build(): CreateQuizResponseAnswerRequest {
		return {
			answerOptionId: this.answerOptionId,
		};
	}
}

export const buildCreateQuizResponseAnswer = () =>
	new CreateQuizResponseAnswerBuilder();
