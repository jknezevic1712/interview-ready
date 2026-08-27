import { CreateQuestionDto } from 'src/common/dtos/questions/createQuestion.dto';
import { Difficulty, QuestionType } from 'src/common/types/enums';
import { buildCreateAnswerOption } from './createAnswerOption.builder';

export class CreateQuestionBuilder implements CreateQuestionDto {
	text = 'Question 1';
	type: CreateQuestionDto['type'] = QuestionType.SINGLE_CHOICE;
	categoryId = 'category-id-1';
	difficulty: CreateQuestionDto['difficulty'] = Difficulty.MID;
	answerOptions = [buildCreateAnswerOption().build()];
	aiGenerated: CreateQuestionDto['aiGenerated'] = false;
	explanation: CreateQuestionDto['explanation'] = 'Lorem ipsum';

	withText(text: CreateQuestionDto['text']) {
		this.text = text;
		return this;
	}

	withType(type: CreateQuestionDto['type']) {
		this.type = type;
		return this;
	}

	withCategoryId(categoryId: CreateQuestionDto['categoryId']) {
		this.categoryId = categoryId;
		return this;
	}

	withDifficulty(difficulty: CreateQuestionDto['difficulty']) {
		this.difficulty = difficulty;
		return this;
	}

	withAnswerOptions(answerOptions: CreateQuestionDto['answerOptions']) {
		this.answerOptions = answerOptions;
		return this;
	}

	withAiGenerated(aiGenerated: CreateQuestionDto['aiGenerated']) {
		this.aiGenerated = aiGenerated;
		return this;
	}

	withExplanation(explanation: CreateQuestionDto['explanation']) {
		this.explanation = explanation;
		return this;
	}

	build(): CreateQuestionDto {
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

export const buildCreateQuestion = () => new CreateQuestionBuilder();
