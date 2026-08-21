import { CreateQuestionInput } from '../types/createQuestion.input';
import { UpdateQuestionInput } from '../types/updateQuestion.input';

export const extractQuestionData = (
	data: CreateQuestionInput | UpdateQuestionInput,
) => ({
	categoryId: data.categoryId,
	text: data.text,
	type: data.type,
	difficulty: data.difficulty,
	answerOptions: {
		createMany: { data: data.answerOptions, skipDuplicates: true },
	},
	explanation: data.explanation ?? null,
	aiGenerated: data.aiGenerated ?? false,
});
