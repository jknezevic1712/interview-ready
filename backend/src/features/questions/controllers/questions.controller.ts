import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Query,
} from '@nestjs/common';
import { GetQuestionDto } from 'src/common/dtos/questions/getQuestion.dto';
import { ParseCuid2Pipe } from 'src/common/pipes/parseCuid2.pipe';
import { QuestionsService } from '../services/questions.service';

@Controller('questions')
export class QuestionsController {
	constructor(private readonly questionsService: QuestionsService) {}

	@Get()
	getQuestions(
		@Query('sessionId', ParseCuid2Pipe) sessionId: string,
	): Promise<GetQuestionDto[]> {
		return this.questionsService.getQuestions(sessionId);
	}

	@Post('link')
	@HttpCode(HttpStatus.NO_CONTENT)
	async linkQuestion(
		@Query('sessionId', ParseCuid2Pipe) sessionId: string,
		@Query('questionId', ParseCuid2Pipe) questionId: string,
	): Promise<void> {
		await this.questionsService.linkQuestion(sessionId, questionId);
	}

	@Post('unlink')
	@HttpCode(HttpStatus.NO_CONTENT)
	async unlinkQuestion(
		@Query('sessionId', ParseCuid2Pipe) sessionId: string,
		@Query('questionId', ParseCuid2Pipe) questionId: string,
	): Promise<void> {
		await this.questionsService.unlinkQuestion(sessionId, questionId);
	}

	@Post('archive')
	@HttpCode(HttpStatus.NO_CONTENT)
	async archiveQuestion(
		@Query('questionId', ParseCuid2Pipe) questionId: string,
	): Promise<void> {
		return await this.questionsService.archiveQuestion(questionId);
	}
}
