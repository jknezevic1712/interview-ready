import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { CATEGORIES_REPOSITORY } from './tokens/categories.token';
import { CategoriesRepository } from './repositories/categories.repository';

@Module({
	controllers: [CategoriesController],
	providers: [
		CategoriesService,
		{ provide: CATEGORIES_REPOSITORY, useClass: CategoriesRepository },
	],
})
export class CategoriesModule {}
