import { Category } from 'src/types/prisma/client';
import type { ICategoriesRepository } from './contracts/categories.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CATEGORIES_REPOSITORY } from './tokens/categories.tokens';

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
