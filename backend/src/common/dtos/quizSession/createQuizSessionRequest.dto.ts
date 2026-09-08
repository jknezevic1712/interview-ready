import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuizSessionRequest {
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	title!: string;
}
