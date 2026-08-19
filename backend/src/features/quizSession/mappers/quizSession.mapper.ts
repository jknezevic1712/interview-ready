import { GetQuizSessionDto } from 'src/common/dtos/quizSession/getQuizSession.dto';
import {
	QuizSessionLitePayload,
	QuizSessionPayload,
} from '../utilities/quizSession.selects';
import { GetQuizSessionLiteDto } from 'src/common/dtos/quizSession/getQuizSessionLite.dto';

export function toGetQuizSessionDto(
	session: QuizSessionPayload,
): GetQuizSessionDto {
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

export function toGetQuizSessionLiteDto(
	session: QuizSessionLitePayload,
): GetQuizSessionLiteDto {
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
