import type { CreateAnswerOptionDto } from 'src/common/dtos/questions/createAnswerOption.dto';

class CreateAnswerOptionBuilder implements CreateAnswerOptionDto {
	text = 'Answer option 1';
	isCorrect = false;

	withText(text: CreateAnswerOptionDto['text']) {
		this.text = text;
		return this;
	}

	withIsCorrect(isCorrect: CreateAnswerOptionDto['isCorrect']) {
		this.isCorrect = isCorrect;
		return this;
	}

	build(): CreateAnswerOptionDto {
		return {
			text: this.text,
			isCorrect: this.isCorrect,
		};
	}
}

export const buildCreateAnswerOption = new CreateAnswerOptionBuilder();
