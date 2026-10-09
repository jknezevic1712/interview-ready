import { QuizSessionStatus } from 'src/common/types/enums';

import type { UpdateQuizSessionRequest } from 'src/common/dtos/quizSession/updateQuizSessionRequest.dto';

export class UpdateQuizSessionRequestBuilder
	implements UpdateQuizSessionRequest
{
	title: UpdateQuizSessionRequest['title'] = 'Quiz session 1';
	status: QuizSessionStatus = QuizSessionStatus.IN_PROGRESS;

	withTitle(title: UpdateQuizSessionRequest['title']) {
		this.title = title;
		return this;
	}

	withStatus(status: UpdateQuizSessionRequest['status']) {
		this.status = status;
		return this;
	}

	build(): UpdateQuizSessionRequest {
		return {
			title: this.title,
			status: this.status,
		};
	}
}

export const buildUpdateQuizSessionRequest = () =>
	new UpdateQuizSessionRequestBuilder();
