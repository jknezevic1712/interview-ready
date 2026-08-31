import { IsEnum } from 'class-validator';
import { QuizSessionStatus } from 'src/common/types/enums';

export class UpdateQuizSessionStatus {
	@IsEnum(QuizSessionStatus)
	sessionStatus!: QuizSessionStatus;
}
