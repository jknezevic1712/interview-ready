import { Difficulty, QuestionType } from 'src/common/types/enums';

import type { GetQuestionDto } from 'src/common/dtos/questions/getQuestion.dto';

class GetQuestionBuilder implements GetQuestionDto {
	id = '1';
	text = 'Question 1';
	type: QuestionType = QuestionType.SINGLE_CHOICE;
	aiGenerated = false;
	difficulty: Difficulty = Difficulty.MID;
	category: GetQuestionDto['category'] = {
		id: 'category-1',
		name: 'CAT-1',
		slug: 'cat-1',
	};
	answerOptions: GetQuestionDto['answerOptions'] = [
		{ id: 'answer-option-1', text: 'Answer option 1', isCorrect: false },
	];
	explanation: GetQuestionDto['explanation'] = 'Lorem ipsum';

	withId(id: GetQuestionDto['id']) {
		this.id = id;
		return this;
	}

	withText(text: GetQuestionDto['text']) {
		this.text = text;
		return this;
	}

	withType(type: GetQuestionDto['type']) {
		this.type = type;
		return this;
	}

	withAiGenerated(aiGenerated: GetQuestionDto['aiGenerated']) {
		this.aiGenerated = aiGenerated;
		return this;
	}

	withDifficulty(difficulty: GetQuestionDto['difficulty']) {
		this.difficulty = difficulty;
		return this;
	}

	withCategory(category: GetQuestionDto['category']) {
		this.category = category;
		return this;
	}

	withAnswerOptions(answerOptions: GetQuestionDto['answerOptions']) {
		this.answerOptions = answerOptions;
		return this;
	}

	withExplanation(explanation: GetQuestionDto['explanation']) {
		this.explanation = explanation;
		return this;
	}

	build(): GetQuestionDto {
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

export const buildGetQuestion = new GetQuestionBuilder();
