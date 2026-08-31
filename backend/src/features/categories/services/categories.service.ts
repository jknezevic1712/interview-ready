import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { toCategoryResponse } from '../mappers/categories.mapper';
import { CATEGORIES_REPOSITORY } from '../tokens/categories.token';

import type { CategoryResponse } from 'src/common/dtos/categories/categoryResponse.dto';
import type { ICategoriesRepository } from '../contracts/categories.repository.contract';

@Injectable()
export class CategoriesService {
	constructor(
		@Inject(CATEGORIES_REPOSITORY)
		private readonly categoriesRepository: ICategoriesRepository,
	) {}

	async getAll(): Promise<CategoryResponse[]> {
		const categories = await this.categoriesRepository.getAll();
		return categories.map(toCategoryResponse);
	}

	async getById(id: string): Promise<CategoryResponse | null> {
		const fetchedCategory = await this.categoriesRepository.getById(id);

		if (fetchedCategory === null) {
			throw new NotFoundException(`Category ${id} was not found`);
		}

		return toCategoryResponse(fetchedCategory);
	}
}
