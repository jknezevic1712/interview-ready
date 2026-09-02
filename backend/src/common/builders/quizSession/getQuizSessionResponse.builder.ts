import { buildGetQuizResponseItem } from './getQuizResponseItem.builder';
import { GetQuizSessionBaseResponseBuilder } from './getQuizSessionBaseResponse.builder';

import type { GetQuizSessionResponse } from 'src/common/dtos/quizSession/getQuizSessionResponse.dto';

export class GetQuizSessionResponseBuilder
	extends GetQuizSessionBaseResponseBuilder
	implements GetQuizSessionResponse
{
	responses: GetQuizSessionResponse['responses'] = [buildGetQuizResponseItem().build()];

	withResponses(responses: GetQuizSessionResponse['responses']) {
		this.responses = responses;
		return this;
	}

	build(): GetQuizSessionResponse {
		return {
			...super.build(),
			responses: this.responses,
		};
	}
}

export const buildGetQuizSessionResponse = () =>
	new GetQuizSessionResponseBuilder();
