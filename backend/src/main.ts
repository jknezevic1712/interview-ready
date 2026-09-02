import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { createSwaggerDocument } from './swagger/createSwaggerDocument';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(helmet());
	app.enableCors();

	// ? Swagger
	const document = createSwaggerDocument(app);
	SwaggerModule.setup('api', app, document);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);
	app.use(cookieParser());

	await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
