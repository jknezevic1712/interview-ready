import { GetQuizSessionBaseBuilder } from './getQuizSessionBase.builder';

import type { GetQuizSessionResponse } from 'src/common/dtos/quizSession/getQuizSessionResponse.dto';

export class GetQuizSessionBuilder
	extends GetQuizSessionBaseBuilder
	implements GetQuizSessionResponse
{
	responses: GetQuizSessionResponse['responses'] = [];

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

export const buildGetQuizSession = () => new GetQuizSessionBuilder();
