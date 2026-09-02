import { GetQuizSessionBaseResponseBuilder } from './getQuizSessionBaseResponse.builder';

import type { GetQuizSessionLiteResponse } from 'src/common/dtos/quizSession/getQuizSessionLiteResponse.dto';

export class GetQuizSessionLiteResponseBuilder
	extends GetQuizSessionBaseResponseBuilder
	implements GetQuizSessionLiteResponse
{

	build(): GetQuizSessionLiteResponse {
		return {
			...super.build(),
		};
	}
}

export const buildGetQuizSessionLiteResponse = () =>
	new GetQuizSessionLiteResponseBuilder();
