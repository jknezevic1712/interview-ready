import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryResponse } from 'src/common/dtos/categories/categoryResponse.dto';
import { CacheService } from 'src/infrastructure/cache/cache.service';
import {
	CACHE_KEYS,
	CACHE_TTL,
} from 'src/infrastructure/cache/utilities/constants';
import { toCategoryResponse } from '../mappers/categories.mapper';
import { CATEGORIES_REPOSITORY } from '../tokens/categories.token';

import type { ICategoriesRepository } from '../contracts/categories.repository.contract';

@Injectable()
export class CategoriesService {
	constructor(
		@Inject(CATEGORIES_REPOSITORY)
		private readonly categoriesRepository: ICategoriesRepository,
		private readonly cacheService: CacheService,
	) {}

	async getAll(): Promise<CategoryResponse[]> {
		const cached = await this.cacheService.get<CategoryResponse[]>(
			CACHE_KEYS.categories.all,
		);
		if (cached !== undefined) return cached;

		const categories = await this.categoriesRepository.getAll();
		const mappedCategories = categories.map(toCategoryResponse);

		await this.cacheService.set(
			CACHE_KEYS.categories.all,
			mappedCategories,
			CACHE_TTL.categories.getAll,
		);

		return mappedCategories;
	}

	async getById(id: string): Promise<CategoryResponse | null> {
		const fetchedCategory = await this.categoriesRepository.getById(id);

		if (fetchedCategory === null) {
			throw new NotFoundException(`Category ${id} was not found`);
		}

		return toCategoryResponse(fetchedCategory);
	}
}
