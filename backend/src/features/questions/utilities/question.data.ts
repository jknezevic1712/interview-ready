import { CreateQuestionRequestInput } from '../types/createQuestionRequest.input';
import { UpdateQuestionRequestInput } from '../types/updateQuestionRequest.input';

export const extractQuestionData = (
	data: CreateQuestionRequestInput | UpdateQuestionRequestInput,
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
