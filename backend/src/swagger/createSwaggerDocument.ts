import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import type { INestApplication } from '@nestjs/common';

export function createSwaggerDocument(app: INestApplication) {
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

	return SwaggerModule.createDocument(app, swaggerConfig);
}
