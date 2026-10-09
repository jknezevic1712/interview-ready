import {
	categoriesControllerGetCategories,
	categoriesControllerGetCategoryById,
} from '@/common/generated/api';

export async function getCategories() {
	const response = await categoriesControllerGetCategories({
		prohibitAuthCookieMutation: true,
	});
	return response;
}

export async function getCategoryById(id: string) {
	const response = await categoriesControllerGetCategoryById(id, {
		prohibitAuthCookieMutation: true,
	});
	return response;
}
