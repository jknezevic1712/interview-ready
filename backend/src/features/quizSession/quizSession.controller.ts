import { Body, Get, Injectable, Param, Patch, Post } from '@nestjs/common';
import type { QuizSession } from 'src/types/client';
import { ParseCuid2Pipe } from 'src/common/pipes/parseCuid2.pipe';
import { QuizSessionService } from './quizSession.service';

@Injectable()
export class QuizSessionController {
	constructor(private readonly quizSessionService: QuizSessionService) {}

	@Get(':userId')
	getQuizSessions(
		@Param('userId', ParseCuid2Pipe) userId: string,
	): Promise<QuizSession[]> {
		return this.quizSessionService.getQuizSessions(userId);
	}

	@Get('quizSession/:quizSessionId')
	getQuizSession(
		@Param('quizSessionId', ParseCuid2Pipe) quizSessionId: string,
	): Promise<QuizSession> {
		return this.quizSessionService.getQuizSession(quizSessionId);
	}

	@Post('quizSession/:userId')
	createQuizSession(
		@Param('userId', ParseCuid2Pipe) userId: string,
	): Promise<QuizSession> {
		return this.quizSessionService.createQuizSession(userId);
	}

	@Patch('quizSession')
	updateQuizSession(@Body() quizSession: QuizSession): Promise<QuizSession> {
		return this.quizSessionService.updateQuizSession(quizSession);
	}
}
