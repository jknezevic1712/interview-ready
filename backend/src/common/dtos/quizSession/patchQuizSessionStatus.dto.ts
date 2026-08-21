import { IsEnum } from 'class-validator';
import { QuizSessionStatus } from 'src/common/types/enums';

export class UpdateQuizSessionStatusDto {
	@IsEnum(QuizSessionStatus)
	sessionStatus!: QuizSessionStatus;
}
