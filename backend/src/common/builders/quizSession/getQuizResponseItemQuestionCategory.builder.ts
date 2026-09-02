import type { GetQuizResponseItemQuestionCategory } from 'src/common/dtos/quizSession/getQuizResponseItemQuestionCategory.dto';

class GetQuizResponseItemQuestionCategoryBuilder implements GetQuizResponseItemQuestionCategory {
	id: GetQuizResponseItemQuestionCategory['id'] = 'category-1';
	name: GetQuizResponseItemQuestionCategory['name'] = 'Cat 1';
	slug: GetQuizResponseItemQuestionCategory['slug'] = 'cat-1';

	withId(id: GetQuizResponseItemQuestionCategory['id']) {
		this.id = id;
		return this;
	}

	withName(name: GetQuizResponseItemQuestionCategory['name']) {
		this.name = name;
		return this;
	}

	withSlug(slug: GetQuizResponseItemQuestionCategory['slug']) {
		this.slug = slug;
		return this;
	}

	build(): GetQuizResponseItemQuestionCategory {
		return {
			id: this.id,
			name: this.name,
			slug: this.slug,
		};
	}
}

export const buildGetQuizResponseItemQuestionCategory = () => new GetQuizResponseItemQuestionCategoryBuilder();