import { QuizSessionStatus } from 'src/common/types/enums';
import { buildGetUserLite } from '../users/getUserLite.builder';

import type { GetQuizSessionBaseResponse } from 'src/common/dtos/quizSession/getQuizSessionBaseResponse.dto';

export abstract class GetQuizSessionBaseBuilder
	implements GetQuizSessionBaseResponse
{
	id = 'quiz-session-1';
	status: QuizSessionStatus = QuizSessionStatus.IN_PROGRESS;
	startedAt = new Date(Date.now());
	completedAt: GetQuizSessionBaseResponse['completedAt'] = null;
	user: GetQuizSessionBaseResponse['user'] = buildGetUserLite().build();

	withId(id: GetQuizSessionBaseResponse['id']) {
		this.id = id;
		return this;
	}

	withStatus(status: GetQuizSessionBaseResponse['status']) {
		this.status = status;
		return this;
	}

	withStartedAt(startedAt: GetQuizSessionBaseResponse['startedAt']) {
		this.startedAt = startedAt;
		return this;
	}

	withCompletedAt(completedAt: GetQuizSessionBaseResponse['completedAt']) {
		this.completedAt = completedAt;
		return this;
	}

	withUser(user: GetQuizSessionBaseResponse['user']) {
		this.user = user;
		return this;
	}

	protected build(): GetQuizSessionBaseResponse {
		return {
			id: this.id,
			status: this.status,
			startedAt: this.startedAt,
			completedAt: this.completedAt,
			user: this.user,
		};
	}
}
