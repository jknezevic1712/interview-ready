import { GetQuizSessionBaseBuilder } from './getQuizSessionBase.builder';

import type { GetQuizSessionLiteResponse } from 'src/common/dtos/quizSession/getQuizSessionLiteResponse.dto';

export class GetQuizSessionLiteBuilder
	extends GetQuizSessionBaseBuilder
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

export const buildGetQuizSessionLite = () => new GetQuizSessionLiteBuilder();
