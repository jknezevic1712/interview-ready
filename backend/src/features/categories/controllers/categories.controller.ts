import { Controller, Get, Param } from '@nestjs/common';
import { Authorize } from 'src/common/decorators/authorize.decorator';
import { ParseCuid2Pipe } from 'src/common/pipes/parseCuid2.pipe';
import { Category, Role } from 'src/common/types/client';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Authorize([Role.ADMIN, Role.USER])
	@Get()
	getCategories(): Promise<Category[]> {
		return this.categoriesService.getAll();
	}

	@Authorize([Role.ADMIN])
	@Get(':id')
	getCategoryById(
		@Param('id', ParseCuid2Pipe) id: string,
	): Promise<Category | null> {
		return this.categoriesService.getById(id);
	}
}
