import type { CreateAnswerOption } from 'src/common/dtos/questions/createAnswerOption.dto';

class CreateAnswerOptionBuilder implements CreateAnswerOption {
	text = 'Answer option 1';
	isCorrect = false;

	withText(text: CreateAnswerOption['text']) {
		this.text = text;
		return this;
	}

	withIsCorrect(isCorrect: CreateAnswerOption['isCorrect']) {
		this.isCorrect = isCorrect;
		return this;
	}

	build(): CreateAnswerOption {
		return {
			text: this.text,
			isCorrect: this.isCorrect,
		};
	}
}

export const buildCreateAnswerOption = () => new CreateAnswerOptionBuilder();
