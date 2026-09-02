import { ApiProperty } from '@nestjs/swagger';
import { QuizSession, User } from 'src/common/types/client';

export class GetQuizSessionBaseResponse {
	id!: QuizSession['id'];
	status!: QuizSession['status'];
	startedAt!: QuizSession['startedAt'];

	@ApiProperty({
		type: String,
		format: 'date-time',
		nullable: true,
	})
	completedAt!: QuizSession['completedAt'];

	user!: {
		id: User['id'];
		name: User['name'];
	};
}
