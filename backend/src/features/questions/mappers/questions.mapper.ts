import { GetQuestionDto } from 'src/common/dtos/questions/getQuestion.dto';
import {
	QuestionLinkPayload,
	QuestionsPayload,
} from '../utilities/questions.selects';
import { QuestionLinkDto } from 'src/common/dtos/questions/questionLink.dto';

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

export const toQuestionLinkDto = (
	questionLinkPayload: QuestionLinkPayload,
): QuestionLinkDto => {
	return {
		questionId: questionLinkPayload.questionId,
	};
};
