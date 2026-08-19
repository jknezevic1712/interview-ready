import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { ParseCuid2Pipe } from 'src/common/pipes/parseCuid2.pipe';
import { QuizSessionService } from '../services/quizSession.service';
import { UpdateQuizSessionStatusDto } from 'src/common/dtos/quizSession/patchQuizSessionStatus.dto';
import { GetQuizSessionDto } from 'src/common/dtos/quizSession/getQuizSession.dto';
import { GetQuizSessionLiteDto } from 'src/common/dtos/quizSession/getQuizSessionLite.dto';

@Controller('quiz-sessions')
export class QuizSessionController {
	constructor(private readonly quizSessionService: QuizSessionService) {}

	@Get()
	// TODO: @CurrentUser() user: User -> add this decorator later on after auth is implemented to extract user from request
	getQuizSessions(
		@Query('userId', ParseCuid2Pipe) userId: string,
	): Promise<GetQuizSessionLiteDto[]> {
		return this.quizSessionService.getQuizSessions(userId);
	}

	@Get(':sessionId')
	getQuizSession(
		@Param('sessionId', ParseCuid2Pipe) sessionId: string,
	): Promise<GetQuizSessionDto> {
		return this.quizSessionService.getQuizSession(sessionId);
	}

	@Post(':userId')
	createQuizSession(
		@Param('userId', ParseCuid2Pipe) userId: string,
	): Promise<GetQuizSessionLiteDto> {
		return this.quizSessionService.createQuizSession(userId);
	}

	@Patch(':sessionId')
	updateQuizSessionStatus(
		@Param('sessionId', ParseCuid2Pipe) sessionId: string,
		@Body() body: UpdateQuizSessionStatusDto,
	): Promise<GetQuizSessionDto> {
		return this.quizSessionService.updateQuizSessionStatus(
			sessionId,
			body.sessionStatus,
		);
	}
}
