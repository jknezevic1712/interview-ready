import { Difficulty, QuestionType } from 'src/common/types/enums';

import type { GetQuestion } from 'src/common/dtos/questions/getQuestion.dto';

class GetQuestionBuilder implements GetQuestion {
	id = '1';
	text = 'Question 1';
	type: QuestionType = QuestionType.SINGLE_CHOICE;
	aiGenerated = false;
	difficulty: Difficulty = Difficulty.MID;
	category: GetQuestion['category'] = {
		id: 'category-1',
		name: 'CAT-1',
		slug: 'cat-1',
	};
	answerOptions: GetQuestion['answerOptions'] = [
		{ id: 'answer-option-1', text: 'Answer option 1', isCorrect: false },
	];
	explanation: GetQuestion['explanation'] = 'Lorem ipsum';

	withId(id: GetQuestion['id']) {
		this.id = id;
		return this;
	}

	withText(text: GetQuestion['text']) {
		this.text = text;
		return this;
	}

	withType(type: GetQuestion['type']) {
		this.type = type;
		return this;
	}

	withAiGenerated(aiGenerated: GetQuestion['aiGenerated']) {
		this.aiGenerated = aiGenerated;
		return this;
	}

	withDifficulty(difficulty: GetQuestion['difficulty']) {
		this.difficulty = difficulty;
		return this;
	}

	withCategory(category: GetQuestion['category']) {
		this.category = category;
		return this;
	}

	withAnswerOptions(answerOptions: GetQuestion['answerOptions']) {
		this.answerOptions = answerOptions;
		return this;
	}

	withExplanation(explanation: GetQuestion['explanation']) {
		this.explanation = explanation;
		return this;
	}

	build(): GetQuestion {
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

export const buildGetQuestion = () => new GetQuestionBuilder();
