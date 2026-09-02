import { Difficulty, QuestionType } from 'src/common/types/enums';
import { buildGetQuizResponseItemQuestionCategory } from './getQuizResponseItemQuestionCategory.builder';
import { buildGetQuizResponseItemQuestionAnswerOption } from './getQuizResponseItemQuestionAnswerOption.builder';

import type { GetQuizResponseItemQuestion } from 'src/common/dtos/quizSession/getQuizResponseItemQuestion.dto';

class GetQuizResponseItemQuestionBuilder implements GetQuizResponseItemQuestion {
	id: GetQuizResponseItemQuestion['id'] = 'quiz-response-item-question-1';
	text: GetQuizResponseItemQuestion['text'] = 'Lorem ipsum';
	explanation: GetQuizResponseItemQuestion['explanation'] = null;
	type: GetQuizResponseItemQuestion['type'] = QuestionType.SINGLE_CHOICE;
	difficulty: GetQuizResponseItemQuestion['difficulty'] = Difficulty.JUNIOR;
	aiGenerated: GetQuizResponseItemQuestion['aiGenerated'] = false;
	createdAt: GetQuizResponseItemQuestion['createdAt'] = new Date(Date.now());
	updatedAt: GetQuizResponseItemQuestion['updatedAt'] = new Date(Date.now());
	category: GetQuizResponseItemQuestion['category'] = buildGetQuizResponseItemQuestionCategory().build();
	answerOptions: GetQuizResponseItemQuestion['answerOptions'] = [buildGetQuizResponseItemQuestionAnswerOption().build()];

	withId(id: GetQuizResponseItemQuestion['id']) {
		this.id = id;
		return this;
	}

	withText(text: GetQuizResponseItemQuestion['text']) {
		this.text = text;
		return this;
	}

	withExplanation(explanation: GetQuizResponseItemQuestion['explanation']) {
		this.explanation = explanation;
		return this;
	}

	withType(type: GetQuizResponseItemQuestion['type']) {
		this.type = type;
		return this;
	}

	withDifficulty(difficulty: GetQuizResponseItemQuestion['difficulty']) {
		this.difficulty = difficulty;
		return this;
	}

	withAiGenerated(aiGenerated: GetQuizResponseItemQuestion['aiGenerated']) {
		this.aiGenerated = aiGenerated;
		return this;
	}

	withCreatedAt(createdAt: GetQuizResponseItemQuestion['createdAt']) {
		this.createdAt = createdAt;
		return this;
	}

	withUpdatedAt(updatedAt: GetQuizResponseItemQuestion['updatedAt']) {
		this.updatedAt = updatedAt;
		return this;
	}

	withCategory(category: GetQuizResponseItemQuestion['category']) {
		this.category = category;
		return this;
	}

	withAnswerOptions(answerOptions: GetQuizResponseItemQuestion['answerOptions']) {
		this.answerOptions = answerOptions;
		return this;
	}

	build(): GetQuizResponseItemQuestion {
		return {
			id: this.id,
			text: this.text,
			explanation: this.explanation,
			type: this.type,
			difficulty: this.difficulty,
			aiGenerated: this.aiGenerated,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			category: this.category,
			answerOptions: this.answerOptions,
		};
	}
}

export const buildGetQuizResponseItemQuestion = () => new GetQuizResponseItemQuestionBuilder();