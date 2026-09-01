import { Module } from '@nestjs/common';
import { QuizSessionController } from './controllers/quizSession.controller';
import { QuizSessionRepository } from './repositories/quizSession.repository';
import { QuizSessionService } from './services/quizSession.service';
import { QUIZ_SESSION_REPOSITORY } from './tokens/quizSession.token';

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
