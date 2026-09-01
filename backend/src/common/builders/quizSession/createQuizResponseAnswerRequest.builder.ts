import type { CreateQuizResponseAnswerRequest } from 'src/common/dtos/quizSession/createQuizResponseAnswerRequest.dto';

class CreateQuizResponseAnswerRequestBuilder
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

export const buildCreateQuizResponseAnswerRequest = () =>
	new CreateQuizResponseAnswerRequestBuilder();
