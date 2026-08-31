import { GetQuizSessionBaseBuilder } from './getQuizSessionBase.builder';

import type { GetQuizSession } from 'src/common/dtos/quizSession/getQuizSession.dto';

export class GetQuizSessionBuilder
	extends GetQuizSessionBaseBuilder
	implements GetQuizSession
{
	responses: GetQuizSession['responses'] = [];

	withResponses(responses: GetQuizSession['responses']) {
		this.responses = responses;
		return this;
	}

	build(): GetQuizSession {
		return {
			...super.build(),
			responses: this.responses,
		};
	}
}

export const buildGetQuizSession = () => new GetQuizSessionBuilder();
