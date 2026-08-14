import { Injectable } from '@nestjs/common';
import { ICategoriesRepository } from '../contracts/categories.repository';
import { Category } from 'src/types/client';
import { PrismaService } from 'src/prisma/prisma.service';

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
