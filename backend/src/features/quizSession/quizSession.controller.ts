import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ParseCuid2Pipe } from 'src/common/pipes/parseCuid2.pipe';
import { QuizSessionService } from './quizSession.service';
import { UpdateQuizSessionStatusDto } from 'src/common/dtos/quizSession/patchQuizSessionStatus.dto';
import { GetQuizSessionDto } from 'src/common/dtos/quizSession/getQuizSession.dto';

@Controller('quiz-session')
export class QuizSessionController {
	constructor(private readonly quizSessionService: QuizSessionService) {}

	@Get('all/:userId')
	getQuizSessions(
		@Param('userId', ParseCuid2Pipe) userId: string,
	): Promise<GetQuizSessionDto[]> {
		return this.quizSessionService.getQuizSessions(userId);
	}

	@Get('session/:quizSessionId')
	getQuizSession(
		@Param('quizSessionId', ParseCuid2Pipe) quizSessionId: string,
	): Promise<GetQuizSessionDto> {
		return this.quizSessionService.getQuizSession(quizSessionId);
	}

	@Post('session/:userId')
	createQuizSession(
		@Param('userId', ParseCuid2Pipe) userId: string,
	): Promise<GetQuizSessionDto> {
		return this.quizSessionService.createQuizSession(userId);
	}

	@Patch('session/:quizSessionId')
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
