import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CategoriesModule } from './features/categories/categories.module';
import { QuizSessionModule } from './features/quizSession/quizSession.module';
import { QuestionsModule } from './features/questions/questions.module';
import { UsersModule } from './features/users/users.module';
import { AuthenticationModule } from './features/authentication/authentication.module';
import { AuthGuard } from './common/guards/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
	imports: [
		PrismaModule,
		CategoriesModule,
		QuizSessionModule,
		QuestionsModule,
		UsersModule,
		AuthenticationModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
