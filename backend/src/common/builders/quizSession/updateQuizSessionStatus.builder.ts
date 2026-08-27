import { QuizSessionStatus } from 'src/common/types/enums';

import type { UpdateQuizSessionStatusDto } from 'src/common/dtos/quizSession/updateQuizSessionStatus.dto';

export class UpdateQuizSessionStatusBuilder
	implements UpdateQuizSessionStatusDto
{
	sessionStatus: QuizSessionStatus = QuizSessionStatus.IN_PROGRESS;

	withSessionStatus(
		sessionStatus: UpdateQuizSessionStatusDto['sessionStatus'],
	) {
		this.sessionStatus = sessionStatus;
		return this;
	}

	build(): UpdateQuizSessionStatusDto {
		return {
			sessionStatus: this.sessionStatus,
		};
	}
}

export const buildUpdateQuizSessionStatus = () =>
	new UpdateQuizSessionStatusBuilder();
