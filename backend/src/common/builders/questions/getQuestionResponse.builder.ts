import { Difficulty, QuestionType } from 'src/common/types/enums';

import type { GetQuestionResponse } from 'src/common/dtos/questions/getQuestionResponse.dto';

class GetQuestionResponseBuilder implements GetQuestionResponse {
	id = '1';
	text = 'Question 1';
	type: QuestionType = QuestionType.SINGLE_CHOICE;
	aiGenerated = false;
	difficulty: Difficulty = Difficulty.MID;
	category: GetQuestionResponse['category'] = {
		id: 'category-1',
		name: 'CAT-1',
		slug: 'cat-1',
	};
	answerOptions: GetQuestionResponse['answerOptions'] = [
		{ id: 'answer-option-1', text: 'Answer option 1', isCorrect: false },
	];
	explanation: GetQuestionResponse['explanation'] = 'Lorem ipsum';

	withId(id: GetQuestionResponse['id']) {
		this.id = id;
		return this;
	}

	withText(text: GetQuestionResponse['text']) {
		this.text = text;
		return this;
	}

	withType(type: GetQuestionResponse['type']) {
		this.type = type;
		return this;
	}

	withAiGenerated(aiGenerated: GetQuestionResponse['aiGenerated']) {
		this.aiGenerated = aiGenerated;
		return this;
	}

	withDifficulty(difficulty: GetQuestionResponse['difficulty']) {
		this.difficulty = difficulty;
		return this;
	}

	withCategory(category: GetQuestionResponse['category']) {
		this.category = category;
		return this;
	}

	withAnswerOptions(answerOptions: GetQuestionResponse['answerOptions']) {
		this.answerOptions = answerOptions;
		return this;
	}

	withExplanation(explanation: GetQuestionResponse['explanation']) {
		this.explanation = explanation;
		return this;
	}

	build(): GetQuestionResponse {
		return {
			id: this.id,
			text: this.text,
			type: this.type,
			aiGenerated: this.aiGenerated,
			difficulty: this.difficulty,
			category: this.category,
			answerOptions: this.answerOptions,
			explanation: this.explanation,
		};
	}
}

export const buildGetQuestionResponse = () => new GetQuestionResponseBuilder();
