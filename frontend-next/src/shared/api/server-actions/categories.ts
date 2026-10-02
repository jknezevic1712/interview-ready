import {
	categoriesControllerGetCategories,
	categoriesControllerGetCategoryById,
} from '@/common/generated/api';

export async function getCategories() {
	const response = await categoriesControllerGetCategories();
	return response;
}

export async function getCategoryById(id: string) {
	const response = await categoriesControllerGetCategoryById(id);
	return response;
}
