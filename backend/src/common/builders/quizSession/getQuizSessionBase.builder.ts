import { QuizSessionStatus } from 'src/common/types/enums';
import { buildGetUserLite } from '../users/getUserLite.builder';

import type { GetQuizSessionBase } from 'src/common/dtos/quizSession/getQuizSessionBase.dto';

export abstract class GetQuizSessionBaseBuilder implements GetQuizSessionBase {
	id = 'quiz-session-1';
	status: QuizSessionStatus = QuizSessionStatus.IN_PROGRESS;
	startedAt = new Date(Date.now());
	completedAt: GetQuizSessionBase['completedAt'] = null;
	user: GetQuizSessionBase['user'] = buildGetUserLite().build();

	withId(id: GetQuizSessionBase['id']) {
		this.id = id;
		return this;
	}

	withStatus(status: GetQuizSessionBase['status']) {
		this.status = status;
		return this;
	}

	withStartedAt(startedAt: GetQuizSessionBase['startedAt']) {
		this.startedAt = startedAt;
		return this;
	}

	withCompletedAt(completedAt: GetQuizSessionBase['completedAt']) {
		this.completedAt = completedAt;
		return this;
	}

	withUser(user: GetQuizSessionBase['user']) {
		this.user = user;
		return this;
	}

	protected build(): GetQuizSessionBase {
		return {
			id: this.id,
			status: this.status,
			startedAt: this.startedAt,
			completedAt: this.completedAt,
			user: this.user,
		};
	}
}
