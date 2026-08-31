import { GetQuestionResponse } from 'src/common/dtos/questions/getQuestionResponse.dto';
import { QuestionPayload } from '../utilities/question.selects';

export const toGetQuestionResponse = (
	questionPayload: QuestionPayload,
): GetQuestionResponse => {
	return {
		id: questionPayload.id,
		text: questionPayload.text,
		explanation: questionPayload.explanation,
		type: questionPayload.type,
		difficulty: questionPayload.difficulty,
		aiGenerated: questionPayload.aiGenerated,
		category: {
			id: questionPayload.category.id,
			name: questionPayload.category.name,
			slug: questionPayload.category.slug,
		},
		answerOptions: questionPayload.answerOptions.map((answerOption) => ({
			id: answerOption.id,
			text: answerOption.text,
			isCorrect: answerOption.isCorrect,
		})),
	};
};
