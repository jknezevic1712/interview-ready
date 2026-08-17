import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/globalExceptionFilter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// ? Swagger
	const swaggerConfig = new DocumentBuilder()
		.setTitle('Interview Ready')
		.setVersion('1.0')
		.build();
	const documentFactory = () =>
		SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('api', app, documentFactory);

	app.useGlobalFilters(new GlobalExceptionFilter());
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
