import { GetQuizSessionBaseResponseBuilder } from './getQuizSessionBaseResponse.builder';

import type { GetQuizSessionLiteResponse } from 'src/common/dtos/quizSession/getQuizSessionLiteResponse.dto';

export class GetQuizSessionLiteResponseBuilder
	extends GetQuizSessionBaseResponseBuilder
	implements GetQuizSessionLiteResponse
{
	responses: GetQuizSessionLiteResponse['responses'] = null;

	build(): GetQuizSessionLiteResponse {
		return {
			...super.build(),
			responses: this.responses,
		};
	}
}

export const buildGetQuizSessionLiteResponse = () =>
	new GetQuizSessionLiteResponseBuilder();
