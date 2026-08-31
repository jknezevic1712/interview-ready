import type { CreateAnswerOptionRequest } from 'src/common/dtos/questions/createAnswerOptionRequest.dto';

class CreateAnswerOptionRequestBuilder implements CreateAnswerOptionRequest {
	text = 'Answer option 1';
	isCorrect = false;

	withText(text: CreateAnswerOptionRequest['text']) {
		this.text = text;
		return this;
	}

	withIsCorrect(isCorrect: CreateAnswerOptionRequest['isCorrect']) {
		this.isCorrect = isCorrect;
		return this;
	}

	build(): CreateAnswerOptionRequest {
		return {
			text: this.text,
			isCorrect: this.isCorrect,
		};
	}
}

export const buildCreateAnswerOptionRequest = () =>
	new CreateAnswerOptionRequestBuilder();
