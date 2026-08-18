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
import { QuizSessionService } from './quizSession.service';
import { UpdateQuizSessionStatusDto } from 'src/common/dtos/quizSession/patchQuizSessionStatus.dto';
import { GetQuizSessionDto } from 'src/common/dtos/quizSession/getQuizSession.dto';

@Controller('quiz-session')
export class QuizSessionController {
	constructor(private readonly quizSessionService: QuizSessionService) {}

	@Get()
	// TODO: @CurrentUser() user: User -> add this decorator later on after auth is implemented to extract user from request
	// Reason is security
	getQuizSessions(
		@Query('userId', ParseCuid2Pipe) userId: string,
	): Promise<GetQuizSessionDto[]> {
		return this.quizSessionService.getQuizSessions(userId);
	}

	@Get(':quizSessionId')
	getQuizSession(
		@Param('quizSessionId', ParseCuid2Pipe) quizSessionId: string,
	): Promise<GetQuizSessionDto> {
		return this.quizSessionService.getQuizSession(quizSessionId);
	}

	@Post(':userId')
	createQuizSession(
		@Param('userId', ParseCuid2Pipe) userId: string,
	): Promise<GetQuizSessionDto> {
		return this.quizSessionService.createQuizSession(userId);
	}

	@Patch(':quizSessionId')
	updateQuizSessionStatus(
		@Param('quizSessionId', ParseCuid2Pipe) quizSessionId: string,
		@Body() body: UpdateQuizSessionStatusDto,
	): Promise<GetQuizSessionDto> {
		return this.quizSessionService.updateQuizSessionStatus(
			quizSessionId,
			body.quizSessionStatus,
		);
	}
}
