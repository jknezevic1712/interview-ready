import { GetQuizSessionDto } from 'src/common/dtos/quizSession/getQuizSession.dto';
import {
	QuizSessionPayload,
	QuizSessionWithUser,
} from '../utilities/quizSession.selects';

export function quizSessionPayloadToGetQuizSessionDto(
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

export function quizSessionWithUserToGetQuizSessionDto(
	session: QuizSessionWithUser,
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
	};
}
