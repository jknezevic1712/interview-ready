import type { CategoryResponse } from 'src/common/dtos/categories/categoryResponse.dto';
import type { Category } from 'src/common/types/client';

export const toCategoryResponse = (category: Category): CategoryResponse => {
	return {
		id: category.id,
		name: category.name,
		slug: category.slug,
		createdAt: category.createdAt,
		updatedAt: category.updatedAt,
	};
};
