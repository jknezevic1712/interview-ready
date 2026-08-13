import { Category } from 'src/generated/prisma/client';

export interface ICategoriesRepository {
  getAll(): Promise<Category[]>;
  getById(id: string): Promise<Category | null>;
}
