import {
	quizSessionControllerCreateQuizResponse,
	quizSessionControllerCreateQuizSession,
	quizSessionControllerGetQuizSession,
	quizSessionControllerGetQuizSessions,
	quizSessionControllerUpdateQuizSession,
} from '@/common/generated/api';
import {
	CreateQuizResponseRequest,
	CreateQuizSessionRequest,
	UpdateQuizSessionRequest,
} from '@/common/generated/models';

export async function getQuizSessions() {
	const response = await quizSessionControllerGetQuizSessions();
	return response;
}

export async function getQuizSessionById(sessionId: string) {
	const response = await quizSessionControllerGetQuizSession(sessionId);
	return response;
}

export async function patchQuizSession(
	sessionId: string,
	request: UpdateQuizSessionRequest,
) {
	const response = await quizSessionControllerUpdateQuizSession(
		sessionId,
		request,
	);
	return response;
}

export async function createQuizSession(request: CreateQuizSessionRequest) {
	const response = await quizSessionControllerCreateQuizSession(request);
	return response;
}

export async function createQuizResponse(request: CreateQuizResponseRequest) {
	const response = await quizSessionControllerCreateQuizResponse(request);
	return response;
}
