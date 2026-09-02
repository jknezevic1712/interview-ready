import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { createSwaggerDocument } from './createSwaggerDocument';

async function generateOpenApi() {
	const app = await NestFactory.create(AppModule, {
		logger: false,
	});

	const document = createSwaggerDocument(app);

	const outputDirectory = resolve(process.cwd(), './src/swagger');
	const outputPath = resolve(outputDirectory, 'openapi.json');

	mkdirSync(outputDirectory, { recursive: true });

	writeFileSync(
		outputPath,
		JSON.stringify(document, null, 2),
	);

	await app.close();
}

generateOpenApi();
