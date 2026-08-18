import { GetQuizSessionDto } from 'src/common/dtos/quizSession/getQuizSession.dto';
import { QuizSessionWithUser } from '../quizSession.selects';

export function toGetQuizSessionDto(
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
