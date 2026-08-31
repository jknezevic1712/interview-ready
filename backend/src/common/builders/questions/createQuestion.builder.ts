import { CreateQuestionRequest } from 'src/common/dtos/questions/createQuestionRequest.dto';
import { Difficulty, QuestionType } from 'src/common/types/enums';
import { buildCreateAnswerOptionRequest } from './createAnswerOption.builder';

export class CreateQuestionRequestBuilder implements CreateQuestionRequest {
	text = 'Question 1';
	type: CreateQuestionRequest['type'] = QuestionType.SINGLE_CHOICE;
	categoryId = 'category-id-1';
	difficulty: CreateQuestionRequest['difficulty'] = Difficulty.MID;
	answerOptions = [buildCreateAnswerOptionRequest().build()];
	aiGenerated: CreateQuestionRequest['aiGenerated'] = false;
	explanation: CreateQuestionRequest['explanation'] = 'Lorem ipsum';

	withText(text: CreateQuestionRequest['text']) {
		this.text = text;
		return this;
	}

	withType(type: CreateQuestionRequest['type']) {
		this.type = type;
		return this;
	}

	withCategoryId(categoryId: CreateQuestionRequest['categoryId']) {
		this.categoryId = categoryId;
		return this;
	}

	withDifficulty(difficulty: CreateQuestionRequest['difficulty']) {
		this.difficulty = difficulty;
		return this;
	}

	withAnswerOptions(answerOptions: CreateQuestionRequest['answerOptions']) {
		this.answerOptions = answerOptions;
		return this;
	}

	withAiGenerated(aiGenerated: CreateQuestionRequest['aiGenerated']) {
		this.aiGenerated = aiGenerated;
		return this;
	}

	withExplanation(explanation: CreateQuestionRequest['explanation']) {
		this.explanation = explanation;
		return this;
	}

	build(): CreateQuestionRequest {
		return {
			text: this.text,
			type: this.type,
			categoryId: this.categoryId,
			difficulty: this.difficulty,
			answerOptions: this.answerOptions,
			aiGenerated: this.aiGenerated,
			explanation: this.explanation,
		};
	}
}

export const buildCreateQuestionRequest = () =>
	new CreateQuestionRequestBuilder();
