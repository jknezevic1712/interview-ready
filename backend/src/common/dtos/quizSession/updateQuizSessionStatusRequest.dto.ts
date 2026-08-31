import { IsEnum } from 'class-validator';
import { QuizSessionStatus } from 'src/common/types/enums';

export class UpdateQuizSessionStatusRequest {
	@IsEnum(QuizSessionStatus)
	sessionStatus!: QuizSessionStatus;
}
