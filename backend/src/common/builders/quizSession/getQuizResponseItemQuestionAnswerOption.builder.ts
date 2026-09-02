import type { GetQuizResponseItemQuestionAnswerOption } from 'src/common/dtos/quizSession/getQuizResponseItemQuestionAnswerOption.dto';

class GetQuizResponseItemQuestionAnswerOptionBuilder implements GetQuizResponseItemQuestionAnswerOption {
	id: GetQuizResponseItemQuestionAnswerOption['id'] = 'question-answer-option-1';
	text: GetQuizResponseItemQuestionAnswerOption['text'] = 'Answer option 1';
	isCorrect: GetQuizResponseItemQuestionAnswerOption['isCorrect'] = true;

	withId(id: GetQuizResponseItemQuestionAnswerOption['id']) {
		this.id = id;
		return this;
	}

	withText(text: GetQuizResponseItemQuestionAnswerOption['text']) {
		this.text = text;
		return this;
	}

	withIsCorrect(isCorrect: GetQuizResponseItemQuestionAnswerOption['isCorrect']) {
		this.isCorrect = isCorrect;
		return this;
	}

	build(): GetQuizResponseItemQuestionAnswerOption {
		return {
			id: this.id,
			text: this.text,
			isCorrect: this.isCorrect
		};
	}
}

export const buildGetQuizResponseItemQuestionAnswerOption = () => new GetQuizResponseItemQuestionAnswerOptionBuilder();