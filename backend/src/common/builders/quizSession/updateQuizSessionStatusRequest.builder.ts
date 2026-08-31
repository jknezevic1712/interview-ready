import { QuizSessionStatus } from 'src/common/types/enums';

import type { UpdateQuizSessionStatusRequest } from 'src/common/dtos/quizSession/updateQuizSessionStatusRequest.dto';

export class UpdateQuizSessionStatusRequestBuilder
	implements UpdateQuizSessionStatusRequest
{
	sessionStatus: QuizSessionStatus = QuizSessionStatus.IN_PROGRESS;

	withSessionStatus(
		sessionStatus: UpdateQuizSessionStatusRequest['sessionStatus'],
	) {
		this.sessionStatus = sessionStatus;
		return this;
	}

	build(): UpdateQuizSessionStatusRequest {
		return {
			sessionStatus: this.sessionStatus,
		};
	}
}

export const buildUpdateQuizSessionStatusRequest = () =>
	new UpdateQuizSessionStatusRequestBuilder();
