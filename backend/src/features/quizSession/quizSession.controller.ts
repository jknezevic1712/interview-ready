import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import type { QuizSession } from 'src/common/types/client';
import { ParseCuid2Pipe } from 'src/common/pipes/parseCuid2.pipe';
import { QuizSessionService } from './quizSession.service';
import { UpdateQuizSessionStatusDto } from 'src/common/DTO/quizSession/patchQuizSessionStatus.dto';

@Controller('quiz-session')
export class QuizSessionController {
	constructor(private readonly quizSessionService: QuizSessionService) {}

	@Get('all/:userId')
	getQuizSessions(
		@Param('userId', ParseCuid2Pipe) userId: string,
	): Promise<QuizSession[]> {
		return this.quizSessionService.getQuizSessions(userId);
	}

	@Get('session/:quizSessionId')
	getQuizSession(
		@Param('quizSessionId', ParseCuid2Pipe) quizSessionId: string,
	): Promise<QuizSession> {
		return this.quizSessionService.getQuizSession(quizSessionId);
	}

	@Post('session/:userId')
	createQuizSession(
		@Param('userId', ParseCuid2Pipe) userId: string,
	): Promise<QuizSession> {
		return this.quizSessionService.createQuizSession(userId);
	}

	@Patch('session/:quizSessionId')
	updateQuizSessionStatus(
		@Param('quizSessionId', ParseCuid2Pipe) quizSessionId: string,
		@Body() body: UpdateQuizSessionStatusDto,
	): Promise<QuizSession> {
		return this.quizSessionService.updateQuizSessionStatus(
			quizSessionId,
			body.quizSessionStatus,
		);
	}
}
