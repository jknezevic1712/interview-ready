import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from 'src/common/decorators/authorize.decorator';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { CreateQuizResponseRequest } from 'src/common/dtos/quizSession/createQuizResponseRequest.dto';
import { CreateQuizSessionRequest } from 'src/common/dtos/quizSession/createQuizSessionRequest.dto';
import { GetQuizResponse } from 'src/common/dtos/quizSession/getQuizResponse.dto';
import { GetQuizSessionLiteResponse } from 'src/common/dtos/quizSession/getQuizSessionLiteResponse.dto';
import { GetQuizSessionResponse } from 'src/common/dtos/quizSession/getQuizSessionResponse.dto';
import { UpdateQuizSessionRequest } from 'src/common/dtos/quizSession/updateQuizSessionRequest.dto';
import { ParseCuid2Pipe } from 'src/common/pipes/parseCuid2.pipe';
import { Role } from 'src/common/types/enums';
import { QuizSessionService } from '../services/quizSession.service';

import type { AccessTokenPayload } from 'src/common/interfaces/authentication/accessTokenPayload.interface';

@ApiTags('Quiz-sessions')
@Controller('quiz-sessions')
export class QuizSessionController {
	constructor(private readonly quizSessionService: QuizSessionService) {}

	@ApiOkResponse({ type: [GetQuizSessionLiteResponse] })
	@Authorize([Role.ADMIN, Role.USER])
	@Get()
	async getQuizSessions(
		@CurrentUser() user: AccessTokenPayload,
	): Promise<GetQuizSessionLiteResponse[]> {
		return this.quizSessionService.getQuizSessions(user.sub);
	}

	@ApiOkResponse({ type: GetQuizSessionResponse })
	@Authorize([Role.ADMIN, Role.USER])
	@Get(':sessionId')
	getQuizSession(
		@Param('sessionId', ParseCuid2Pipe) sessionId: string,
		@CurrentUser() user: AccessTokenPayload,
	): Promise<GetQuizSessionResponse> {
		return this.quizSessionService.getQuizSession(sessionId, user.sub);
	}

	@ApiCreatedResponse({ type: GetQuizSessionLiteResponse })
	@Authorize([Role.ADMIN, Role.USER])
	@Post('/create')
	@HttpCode(HttpStatus.CREATED)
	createQuizSession(
		@Body() body: CreateQuizSessionRequest,
		@CurrentUser() user: AccessTokenPayload,
	): Promise<GetQuizSessionLiteResponse> {
		return this.quizSessionService.createQuizSession(body, user.sub);
	}

	@ApiCreatedResponse({ type: GetQuizSessionResponse })
	@Authorize([Role.ADMIN, Role.USER])
	@Patch(':sessionId')
	updateQuizSession(
		@Param('sessionId', ParseCuid2Pipe) sessionId: string,
		@Body() body: UpdateQuizSessionRequest,
		@CurrentUser() user: AccessTokenPayload,
	): Promise<GetQuizSessionResponse> {
		return this.quizSessionService.updateQuizSession(sessionId, user.sub, body);
	}

	@ApiCreatedResponse({ type: GetQuizResponse })
	@Authorize([Role.ADMIN, Role.USER])
	@Post('/response')
	@HttpCode(HttpStatus.CREATED)
	createQuizResponse(
		@Body() body: CreateQuizResponseRequest,
		@CurrentUser() user: AccessTokenPayload,
	): Promise<GetQuizResponse> {
		return this.quizSessionService.createQuizResponse(body, user.sub);
	}
}
