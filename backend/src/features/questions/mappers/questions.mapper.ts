import { GetQuestionDto } from 'src/common/dtos/questions/getQuestion.dto';
import { QuestionsPayload } from '../utilities/questions.selects';

export const toGetQuestionDto = (
	questionsPayload: QuestionsPayload,
): GetQuestionDto => {
	return {
		id: questionsPayload.id,
		text: questionsPayload.text,
		explanation: questionsPayload.explanation,
		type: questionsPayload.type,
		difficulty: questionsPayload.difficulty,
		aiGenerated: questionsPayload.aiGenerated,
		category: {
			id: questionsPayload.category.id,
			name: questionsPayload.category.name,
			slug: questionsPayload.category.slug,
		},
		answerOptions: questionsPayload.answerOptions.map((answerOption) => ({
			id: answerOption.id,
			text: answerOption.text,
			isCorrect: answerOption.isCorrect,
		})),
	};
};
