import { CreateQuestion } from 'src/common/dtos/questions/createQuestion.dto';
import { Difficulty, QuestionType } from 'src/common/types/enums';
import { buildCreateAnswerOption } from './createAnswerOption.builder';

export class CreateQuestionBuilder implements CreateQuestion {
	text = 'Question 1';
	type: CreateQuestion['type'] = QuestionType.SINGLE_CHOICE;
	categoryId = 'category-id-1';
	difficulty: CreateQuestion['difficulty'] = Difficulty.MID;
	answerOptions = [buildCreateAnswerOption().build()];
	aiGenerated: CreateQuestion['aiGenerated'] = false;
	explanation: CreateQuestion['explanation'] = 'Lorem ipsum';

	withText(text: CreateQuestion['text']) {
		this.text = text;
		return this;
	}

	withType(type: CreateQuestion['type']) {
		this.type = type;
		return this;
	}

	withCategoryId(categoryId: CreateQuestion['categoryId']) {
		this.categoryId = categoryId;
		return this;
	}

	withDifficulty(difficulty: CreateQuestion['difficulty']) {
		this.difficulty = difficulty;
		return this;
	}

	withAnswerOptions(answerOptions: CreateQuestion['answerOptions']) {
		this.answerOptions = answerOptions;
		return this;
	}

	withAiGenerated(aiGenerated: CreateQuestion['aiGenerated']) {
		this.aiGenerated = aiGenerated;
		return this;
	}

	withExplanation(explanation: CreateQuestion['explanation']) {
		this.explanation = explanation;
		return this;
	}

	build(): CreateQuestion {
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
