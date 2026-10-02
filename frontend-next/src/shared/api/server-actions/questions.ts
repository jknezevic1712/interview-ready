import {
	questionsControllerArchiveQuestion,
	questionsControllerCreateQuestionRequest,
	questionsControllerGetQuestions,
	questionsControllerLinkQuestion,
	questionsControllerUnlinkQuestion,
	questionsControllerUpdateQuestion,
} from '@/common/generated/api';
import {
	CreateQuestionRequest,
	QuestionsControllerArchiveQuestionParams,
	QuestionsControllerGetQuestionsParams,
	QuestionsControllerLinkQuestionParams,
	QuestionsControllerUnlinkQuestionParams,
	UpdateQuestionRequest,
} from '@/common/generated/models';

export async function getQuestions(
	params: QuestionsControllerGetQuestionsParams,
) {
	const response = await questionsControllerGetQuestions(params);
	return response;
}

export async function createQuestion(request: CreateQuestionRequest) {
	const response = await questionsControllerCreateQuestionRequest(request);
	return response;
}

export async function patchQuestion(request: UpdateQuestionRequest) {
	const response = await questionsControllerUpdateQuestion(request);
	return response;
}

export async function linkQuestion(
	params: QuestionsControllerLinkQuestionParams,
) {
	const response = await questionsControllerLinkQuestion(params);
	return response;
}

export async function unlinkQuestion(
	params: QuestionsControllerUnlinkQuestionParams,
) {
	const response = await questionsControllerUnlinkQuestion(params);
	return response;
}

export async function archiveQuestion(
	params: QuestionsControllerArchiveQuestionParams,
) {
	const response = await questionsControllerArchiveQuestion(params);
	return response;
}
