import { Category } from 'src/types/client';

export interface ICategoriesRepository {
	getAll(): Promise<Category[]>;
	getById(id: string): Promise<Category | null>;
}
