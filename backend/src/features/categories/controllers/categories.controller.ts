import { Controller, Get, Param } from '@nestjs/common';
import { Category } from 'src/common/types/client';
import { ParseCuid2Pipe } from 'src/common/pipes/parseCuid2.pipe';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Get()
	getCategories(): Promise<Category[]> {
		return this.categoriesService.getAll();
	}

	@Get(':id')
	getCategoryById(
		@Param('id', ParseCuid2Pipe) id: string,
	): Promise<Category | null> {
		return this.categoriesService.getById(id);
	}
}
