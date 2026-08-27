import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { Authorize } from 'src/common/decorators/authorize.decorator';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { CreateQuestionDto } from 'src/common/dtos/questions/createQuestion.dto';
import { GetQuestionDto } from 'src/common/dtos/questions/getQuestion.dto';
import { UpdateQuestionDto } from 'src/common/dtos/questions/updateQuestion.dto';
import { ParseCuid2Pipe } from 'src/common/pipes/parseCuid2.pipe';
import { Role } from 'src/common/types/enums';
import { QuestionsService } from '../services/questions.service';

import type { ValidatedAccessTokenPayload } from 'src/common/interfaces/authentication/validatedAccessTokenPayload.interface';

@Controller('questions')
export class QuestionsController {
	constructor(private readonly questionsService: QuestionsService) {}

	@Authorize([Role.USER])
	@Get()
	getQuestions(
		@Query('sessionId', ParseCuid2Pipe) sessionId: string,
		@CurrentUser() user: ValidatedAccessTokenPayload,
	): Promise<GetQuestionDto[]> {
		return this.questionsService.getQuestions(sessionId, user.sub);
	}

	@Post()
	createQuestion(@Body() body: CreateQuestionDto): Promise<GetQuestionDto> {
		return this.questionsService.createQuestion(body);
	}

	@Patch()
	updateQuestion(@Body() body: UpdateQuestionDto): Promise<GetQuestionDto> {
		return this.questionsService.updateQuestion(body);
	}

	@Post('link')
	@HttpCode(HttpStatus.NO_CONTENT)
	async linkQuestion(
		@Query('sessionId', ParseCuid2Pipe) sessionId: string,
		@Query('questionId', ParseCuid2Pipe) questionId: string,
	): Promise<void> {
		await this.questionsService.linkQuestion(sessionId, questionId);
	}

	@Delete('unlink')
	@HttpCode(HttpStatus.NO_CONTENT)
	async unlinkQuestion(
		@Query('sessionId', ParseCuid2Pipe) sessionId: string,
		@Query('questionId', ParseCuid2Pipe) questionId: string,
	): Promise<void> {
		await this.questionsService.unlinkQuestion(sessionId, questionId);
	}

	@Patch('archive')
	@HttpCode(HttpStatus.NO_CONTENT)
	async archiveQuestion(
		@Query('questionId', ParseCuid2Pipe) questionId: string,
	): Promise<void> {
		await this.questionsService.archiveQuestion(questionId);
	}
}
