import { Category } from 'src/types/prisma/client';

export interface ICategoriesRepository {
  getAll(): Promise<Category[]>;
  getById(id: string): Promise<Category | null>;
}
