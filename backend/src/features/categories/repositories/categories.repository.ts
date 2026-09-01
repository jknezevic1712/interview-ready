import { Injectable } from '@nestjs/common';
import { Category } from 'src/common/types/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICategoriesRepository } from '../contracts/categories.repository.contract';

@Injectable()
export class CategoriesRepository implements ICategoriesRepository {
	constructor(private readonly db: PrismaService) {}

	getAll(): Promise<Category[]> {
		return this.db.category.findMany();
	}

	getById(id: string): Promise<Category | null> {
		return this.db.category.findUnique({
			where: { id },
		});
	}
}
