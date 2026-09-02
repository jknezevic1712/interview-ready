import { GetQuizResponseItem } from './getQuizResponseItem.dto';
import { GetQuizSessionBaseResponse } from './getQuizSessionBaseResponse.dto';

export class GetQuizSessionResponse extends GetQuizSessionBaseResponse {
	responses!: GetQuizResponseItem[];
}
