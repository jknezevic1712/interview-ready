import type { GetQuizSessionLiteResponse } from '@/common/generated/models';

export interface QuizSessionsTableData {
	id: GetQuizSessionLiteResponse['id'];
	title: GetQuizSessionLiteResponse['title'];
	status: GetQuizSessionLiteResponse['status'];
}
