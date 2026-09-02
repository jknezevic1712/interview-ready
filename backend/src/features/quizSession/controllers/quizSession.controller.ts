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
import { GetQuizResponse } from 'src/common/dtos/quizSession/getQuizResponse.dto';
import { GetQuizSessionLiteResponse } from 'src/common/dtos/quizSession/getQuizSessionLiteResponse.dto';
import { GetQuizSessionResponse } from 'src/common/dtos/quizSession/getQuizSessionResponse.dto';
import { UpdateQuizSessionStatusRequest } from 'src/common/dtos/quizSession/updateQuizSessionStatusRequest.dto';
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
		@CurrentUser() user: AccessTokenPayload,
	): Promise<GetQuizSessionLiteResponse> {
		return this.quizSessionService.createQuizSession(user.sub);
	}

	@ApiCreatedResponse({ type: GetQuizSessionResponse })
	@Authorize([Role.ADMIN, Role.USER])
	@Patch(':sessionId')
	updateQuizSessionStatus(
		@Param('sessionId', ParseCuid2Pipe) sessionId: string,
		@Body() body: UpdateQuizSessionStatusRequest,
		@CurrentUser() user: AccessTokenPayload,
	): Promise<GetQuizSessionResponse> {
		return this.quizSessionService.updateQuizSessionStatus(
			sessionId,
			user.sub,
			body.sessionStatus,
		);
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
