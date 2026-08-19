import { GetQuestionDto } from 'src/common/dtos/questions/getQuestion.dto';
import { QuestionsPayload } from '../utilities/questions.selects';

export const toGetQuestionDto = (
	questionsPayload: QuestionsPayload[],
): GetQuestionDto[] => {
	return questionsPayload.map((q) => ({
		id: q.id,
		text: q.text,
		explanation: q.explanation,
		type: q.type,
		difficulty: q.difficulty,
		aiGenerated: q.aiGenerated,
		category: {
			id: q.category.id,
			name: q.category.name,
			slug: q.category.slug,
		},
		answerOptions: q.answerOptions.map((answerOption) => ({
			id: answerOption.id,
			text: answerOption.text,
			isCorrect: answerOption.isCorrect,
		})),
	}));
};
