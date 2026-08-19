import { GetQuestionDto } from 'src/common/dtos/questions/getQuestion.dto';
import { QuestionPayload } from '../utilities/questions.selects';

export const toGetQuestionDto = (
	questionPayload: QuestionPayload,
): GetQuestionDto => {
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
