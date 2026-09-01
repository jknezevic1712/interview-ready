import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(helmet());
	app.enableCors();

	// ? Swagger
	const swaggerConfig = new DocumentBuilder()
		.setTitle('Interview Ready')
		.setVersion('1.0')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				description: 'JWT access token',
			},
			'access-token',
		)
		.build();
	const documentFactory = () =>
		SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('api', app, documentFactory);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);
	app.use(cookieParser());

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
