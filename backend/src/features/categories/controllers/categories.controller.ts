import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from 'src/common/decorators/authorize.decorator';
import { CategoryResponse } from 'src/common/dtos/categories/categoryResponse.dto';
import { ParseCuid2Pipe } from 'src/common/pipes/parseCuid2.pipe';
import { Role } from 'src/common/types/client';
import { CategoriesService } from '../services/categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@ApiOkResponse({ type: [CategoryResponse] })
	@Authorize([Role.ADMIN, Role.USER])
	@Get()
	getCategories(): Promise<CategoryResponse[]> {
		return this.categoriesService.getAll();
	}

	@ApiOkResponse({ type: CategoryResponse })
	@Authorize([Role.ADMIN])
	@Get(':id')
	getCategoryById(
		@Param('id', ParseCuid2Pipe) id: string,
	): Promise<CategoryResponse | null> {
		return this.categoriesService.getById(id);
	}
}
