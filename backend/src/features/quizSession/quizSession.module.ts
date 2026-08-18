import { Module } from '@nestjs/common';
import { QuizSessionController } from './quizSession.controller';
import { QuizSessionService } from './quizSession.service';
import { QUIZ_SESSION_REPOSITORY } from './tokens/quizSession.token';
import { QuizSessionRepository } from './repositories/quizSession.repository';

@Module({
	controllers: [QuizSessionController],
	providers: [
		QuizSessionService,
		{
			provide: QUIZ_SESSION_REPOSITORY,
			useClass: QuizSessionRepository,
		},
	],
})
export class QuizSessionModule {}
