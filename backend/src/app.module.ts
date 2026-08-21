import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CategoriesModule } from './features/categories/categories.module';
import { QuizSessionModule } from './features/quizSession/quizSession.module';
import { QuestionsModule } from './features/questions/questions.module';

@Module({
	imports: [PrismaModule, CategoriesModule, QuizSessionModule, QuestionsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
