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
import { CreateQuestion } from 'src/common/dtos/questions/createQuestion.dto';
import { GetQuestion } from 'src/common/dtos/questions/getQuestion.dto';
import { UpdateQuestion } from 'src/common/dtos/questions/updateQuestion.dto';
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
	): Promise<GetQuestion[]> {
		return this.questionsService.getQuestions(sessionId, user.sub);
	}

	@Authorize([Role.ADMIN])
	@Post()
	createQuestion(@Body() body: CreateQuestion): Promise<GetQuestion> {
		return this.questionsService.createQuestion(body);
	}

	@Authorize([Role.ADMIN])
	@Patch()
	updateQuestion(@Body() body: UpdateQuestion): Promise<GetQuestion> {
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
