import type { Category } from 'src/common/types/client';

export class GetQuizResponseItemQuestionCategory {
	id!: Category['id'];
	name!: Category['name'];
	slug!: Category['slug'];
}
