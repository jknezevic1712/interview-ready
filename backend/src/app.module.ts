import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './common/guards/auth/auth.guard';
import { AuthenticationModule } from './features/authentication/authentication.module';
import { CategoriesModule } from './features/categories/categories.module';
import { QuestionsModule } from './features/questions/questions.module';
import { QuizSessionModule } from './features/quizSession/quizSession.module';
import { UsersModule } from './features/users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';

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
