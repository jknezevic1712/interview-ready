import { QuizSession, User } from 'src/common/types/client';

export class GetQuizSessionLiteDto {
	id!: QuizSession['id'];
	status!: QuizSession['status'];
	startedAt!: QuizSession['startedAt'];
	completedAt!: QuizSession['completedAt'];
	user!: {
		id: User['id'];
		name: User['name'];
	};
	responses!: null;
}
