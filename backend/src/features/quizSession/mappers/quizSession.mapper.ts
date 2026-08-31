import { GetQuizResponse } from 'src/common/dtos/quizSession/getQuizResponse.dto';
import { GetQuizSession } from 'src/common/dtos/quizSession/getQuizSession.dto';
import { GetQuizSessionLite } from 'src/common/dtos/quizSession/getQuizSessionLite.dto';
import { QuizResponse } from 'src/common/types/client';
import {
	QuizSessionLitePayload,
	QuizSessionPayload,
} from '../utilities/quizSession.selects';

export function toGetQuizSession(session: QuizSessionPayload): GetQuizSession {
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

export function toGetQuizSessionLite(
	session: QuizSessionLitePayload,
): GetQuizSessionLite {
	return {
		id: session.id,
		status: session.status,
		startedAt: session.startedAt,
		completedAt: session.completedAt,
		user: {
			id: session.user.id,
			name: session.user.name,
		},
		responses: null,
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
