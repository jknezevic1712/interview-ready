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
import { CreateQuestionRequest } from 'src/common/dtos/questions/createQuestionRequest.dto';
import { GetQuestionResponse } from 'src/common/dtos/questions/getQuestionResponse.dto';
import { UpdateQuestionRequest } from 'src/common/dtos/questions/updateQuestionRequest.dto';
import { ParseCuid2Pipe } from 'src/common/pipes/parseCuid2.pipe';
import { Role } from 'src/common/types/enums';
import { QuestionsService } from '../services/questions.service';

import type { ValidatedAccessTokenPayload } from 'src/common/interfaces/authentication/validatedAccessTokenPayload.interface';

@Controller('questions')
export class QuestionsController {
	constructor(private readonly questionsService: QuestionsService) {}

	@Authorize([Role.ADMIN, Role.USER])
	@Get()
	getQuestions(
		@Query('sessionId', ParseCuid2Pipe) sessionId: string,
		@CurrentUser() user: ValidatedAccessTokenPayload,
	): Promise<GetQuestionResponse[]> {
		return this.questionsService.getQuestions(sessionId, user.sub);
	}

	@Authorize([Role.ADMIN])
	@Post()
	CreateQuestionRequest(
		@Body() body: CreateQuestionRequest,
	): Promise<GetQuestionResponse> {
		return this.questionsService.CreateQuestionRequest(body);
	}

	@Authorize([Role.ADMIN])
	@Patch()
	updateQuestion(
		@Body() body: UpdateQuestionRequest,
	): Promise<GetQuestionResponse> {
		return this.questionsService.updateQuestion(body);
	}

	@Authorize([Role.ADMIN])
	@Post('link')
	@HttpCode(HttpStatus.NO_CONTENT)
	async linkQuestion(
		@Query('sessionId', ParseCuid2Pipe) sessionId: string,
		@Query('questionId', ParseCuid2Pipe) questionId: string,
	): Promise<void> {
		await this.questionsService.linkQuestion(sessionId, questionId);
	}

	@Authorize([Role.ADMIN])
	@Delete('unlink')
	@HttpCode(HttpStatus.NO_CONTENT)
	async unlinkQuestion(
		@Query('sessionId', ParseCuid2Pipe) sessionId: string,
		@Query('questionId', ParseCuid2Pipe) questionId: string,
	): Promise<void> {
		await this.questionsService.unlinkQuestion(sessionId, questionId);
	}

	@Authorize([Role.ADMIN])
	@Patch('archive')
	@HttpCode(HttpStatus.NO_CONTENT)
	async archiveQuestion(
		@Query('questionId', ParseCuid2Pipe) questionId: string,
	): Promise<void> {
		await this.questionsService.archiveQuestion(questionId);
	}
}
