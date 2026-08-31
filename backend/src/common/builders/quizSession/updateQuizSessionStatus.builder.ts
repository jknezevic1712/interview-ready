import { QuizSessionStatus } from 'src/common/types/enums';

import type { UpdateQuizSessionStatus } from 'src/common/dtos/quizSession/updateQuizSessionStatus.dto';

export class UpdateQuizSessionStatusBuilder implements UpdateQuizSessionStatus {
	sessionStatus: QuizSessionStatus = QuizSessionStatus.IN_PROGRESS;

	withSessionStatus(sessionStatus: UpdateQuizSessionStatus['sessionStatus']) {
		this.sessionStatus = sessionStatus;
		return this;
	}

	build(): UpdateQuizSessionStatus {
		return {
			sessionStatus: this.sessionStatus,
		};
	}
}

export const buildUpdateQuizSessionStatus = () =>
	new UpdateQuizSessionStatusBuilder();
