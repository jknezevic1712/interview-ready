import type { CategoryResponse } from 'src/common/dtos/categories/categoryResponse.dto';

class CategoryResponseBuilder implements CategoryResponse {
	id = 'category-1';
	name = 'Cat 1';
	slug = 'cat-1';
	createdAt = new Date(Date.now());
	updatedAt = new Date(Date.now());

	withId(id: CategoryResponse['id']) {
		this.id = id;
		return this;
	}

	withName(name: CategoryResponse['name']) {
		this.name = name;
		return this;
	}

	withSlug(slug: CategoryResponse['slug']) {
		this.slug = slug;
		return this;
	}

	withCreatedAt(createdAt: CategoryResponse['createdAt']) {
		this.createdAt = createdAt;
		return this;
	}

	withUpdatedAt(updatedAt: CategoryResponse['updatedAt']) {
		this.updatedAt = updatedAt;
		return this;
	}

	build(): CategoryResponse {
		return {
			id: this.id,
			name: this.name,
			slug: this.slug,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}

export const buildCategoryResponse = () => new CategoryResponseBuilder();
