import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Authorize } from 'src/common/decorators/authorize.decorator';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { CreateQuizResponseDto } from 'src/common/dtos/quizSession/createQuizResponse.dto';
import { GetQuizResponseDto } from 'src/common/dtos/quizSession/getQuizResponse.dto';
import { GetQuizSessionDto } from 'src/common/dtos/quizSession/getQuizSession.dto';
import { GetQuizSessionLiteDto } from 'src/common/dtos/quizSession/getQuizSessionLite.dto';
import { UpdateQuizSessionStatusDto } from 'src/common/dtos/quizSession/updateQuizSessionStatus.dto';
import { ParseCuid2Pipe } from 'src/common/pipes/parseCuid2.pipe';
import { Role } from 'src/common/types/enums';
import { QuizSessionService } from '../services/quizSession.service';

import type { AccessTokenPayload } from 'src/common/interfaces/authentication/accessTokenPayload.interface';

@Controller('quiz-sessions')
export class QuizSessionController {
	constructor(private readonly quizSessionService: QuizSessionService) {}

	@Authorize([Role.ADMIN, Role.USER])
	@Get()
	async getQuizSessions(
		@CurrentUser() user: AccessTokenPayload,
	): Promise<GetQuizSessionLiteDto[]> {
		return this.quizSessionService.getQuizSessions(user.sub);
	}

	@Authorize([Role.ADMIN, Role.USER])
	@Get(':sessionId')
	getQuizSession(
		@Param('sessionId', ParseCuid2Pipe) sessionId: string,
		@CurrentUser() user: AccessTokenPayload,
	): Promise<GetQuizSessionDto> {
		return this.quizSessionService.getQuizSession(sessionId, user.sub);
	}

	@Authorize([Role.ADMIN, Role.USER])
	@Post('/create')
	createQuizSession(
		@CurrentUser() user: AccessTokenPayload,
	): Promise<GetQuizSessionLiteDto> {
		return this.quizSessionService.createQuizSession(user.sub);
	}

	@Authorize([Role.ADMIN, Role.USER])
	@Patch(':sessionId')
	updateQuizSessionStatus(
		@Param('sessionId', ParseCuid2Pipe) sessionId: string,
		@Body() body: UpdateQuizSessionStatusDto,
		@CurrentUser() user: AccessTokenPayload,
	): Promise<GetQuizSessionDto> {
		return this.quizSessionService.updateQuizSessionStatus(
			sessionId,
			user.sub,
			body.sessionStatus,
		);
	}

	@Authorize([Role.ADMIN, Role.USER])
	@Post('/response')
	createQuizResponse(
		@Body() body: CreateQuizResponseDto,
		@CurrentUser() user: AccessTokenPayload,
	): Promise<GetQuizResponseDto> {
		return this.quizSessionService.createQuizResponse(body, user.sub);
	}
}
