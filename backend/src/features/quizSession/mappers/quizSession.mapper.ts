import { GetQuizResponse } from 'src/common/dtos/quizSession/getQuizResponse.dto';
import { GetQuizSessionLiteResponse } from 'src/common/dtos/quizSession/getQuizSessionLiteResponse.dto';
import { GetQuizSessionResponse } from 'src/common/dtos/quizSession/getQuizSessionResponse.dto';
import { QuizResponse } from 'src/common/types/client';
import {
	QuizSessionLitePayload,
	QuizSessionPayload,
} from '../utilities/quizSession.selects';

export function toGetQuizSessionResponse(
	session: QuizSessionPayload,
): GetQuizSessionResponse {
	return {
		id: session.id,
		status: session.status,
		startedAt: session.startedAt,
		completedAt: session.completedAt,
		user: {
			id: session.user.id,
			name: session.user.name,
		},
		responses: session.responses.map((response) => {
			const { answers, ...responseData } = response;

			return {
				...responseData,
				answersIds: response.answers.map((answer) => answer.answerOptionId),
			};
		}),
	};
}

export function toGetQuizSessionLiteResponse(
	session: QuizSessionLitePayload,
): GetQuizSessionLiteResponse {
	return {
		id: session.id,
		status: session.status,
		startedAt: session.startedAt,
		completedAt: session.completedAt,
		user: {
			id: session.user.id,
			name: session.user.name,
		},
	};
}

export function toGetQuizResponse(quizResponse: QuizResponse): GetQuizResponse {
	return {
		id: quizResponse.id,
		isCorrect: quizResponse.isCorrect,
		score: quizResponse.score,
		answeredAt: quizResponse.answeredAt,
	};
}
