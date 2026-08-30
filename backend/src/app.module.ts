import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthenticationGuard } from './common/guards/authentication.guard';
import { AuthorizationGuard } from './common/guards/authorization.guard';
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
		ThrottlerModule.forRoot({
			throttlers: [
				{
					limit: 30,
					ttl: 60000,
				},
			],
		}),
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
		{
			provide: APP_GUARD,
			useClass: AuthenticationGuard,
		},
		{
			provide: APP_GUARD,
			useClass: AuthorizationGuard,
		},
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
