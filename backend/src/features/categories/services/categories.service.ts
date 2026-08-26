import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/common/types/client';
import { CATEGORIES_REPOSITORY } from '../tokens/categories.token';

import type { ICategoriesRepository } from '../contracts/categories.repository';

@Injectable()
export class CategoriesService {
	constructor(
		@Inject(CATEGORIES_REPOSITORY)
		private readonly categoriesRepository: ICategoriesRepository,
	) {}

	getAll(): Promise<Category[]> {
		return this.categoriesRepository.getAll();
	}

	async getById(id: string): Promise<Category | null> {
		const fetchedCategory = await this.categoriesRepository.getById(id);

		if (fetchedCategory === null) {
			throw new NotFoundException(`Category ${id} was not found`);
		}

		return fetchedCategory;
	}
}
