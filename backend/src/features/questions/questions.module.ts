import { Module } from '@nestjs/common';
import { QuestionsController } from './controllers/questions.controller';
import { QuestionsRepository } from './repositories/questions.repository';
import { QuestionsService } from './services/questions.service';
import { QUESTIONS_REPOSITORY } from './tokens/questions.token';

@Module({
	controllers: [QuestionsController],
	providers: [
		QuestionsService,
		{
			provide: QUESTIONS_REPOSITORY,
			useClass: QuestionsRepository,
		},
	],
})
export class QuestionsModule {}
