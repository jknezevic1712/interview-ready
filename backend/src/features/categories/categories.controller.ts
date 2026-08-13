import { Controller, Get, Param } from '@nestjs/common';
import { Category } from 'src/generated/prisma/client';
import { CategoriesService } from './categories.service';
import { ParseCuid2Pipe } from 'src/utilities/pipes/parseCuid2.pipe';

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
