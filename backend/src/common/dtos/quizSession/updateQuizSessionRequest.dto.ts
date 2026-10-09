import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { QuizSessionStatus } from 'src/common/types/enums';

export class UpdateQuizSessionRequest {
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	title!: string;

	@IsEnum(QuizSessionStatus)
	status!: QuizSessionStatus;
}
