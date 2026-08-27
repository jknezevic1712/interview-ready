import { QuizSessionStatus } from 'src/common/types/enums';
import { buildGetUserLite } from '../users/getUserLite.builder';

import type { GetQuizSessionBaseDto } from 'src/common/dtos/quizSession/getQuizSessionBase.dto';

export abstract class GetQuizSessionBaseBuilder
	implements GetQuizSessionBaseDto
{
	id = 'quiz-session-1';
	status: QuizSessionStatus = QuizSessionStatus.IN_PROGRESS;
	startedAt = new Date(Date.now());
	completedAt: GetQuizSessionBaseDto['completedAt'] = null;
	user: GetQuizSessionBaseDto['user'] = buildGetUserLite().build();

	withId(id: GetQuizSessionBaseDto['id']) {
		this.id = id;
		return this;
	}

	withStatus(status: GetQuizSessionBaseDto['status']) {
		this.status = status;
		return this;
	}

	withStartedAt(startedAt: GetQuizSessionBaseDto['startedAt']) {
		this.startedAt = startedAt;
		return this;
	}

	withCompletedAt(completedAt: GetQuizSessionBaseDto['completedAt']) {
		this.completedAt = completedAt;
		return this;
	}

	withUser(user: GetQuizSessionBaseDto['user']) {
		this.user = user;
		return this;
	}

	protected build(): GetQuizSessionBaseDto {
		return {
			id: this.id,
			status: this.status,
			startedAt: this.startedAt,
			completedAt: this.completedAt,
			user: this.user,
		};
	}
}
