import { GetQuizSessionBaseBuilder } from './getQuizSessionBase.builder';

import type { GetQuizSessionDto } from 'src/common/dtos/quizSession/getQuizSession.dto';

export class GetQuizSessionBuilder
	extends GetQuizSessionBaseBuilder
	implements GetQuizSessionDto
{
	responses: GetQuizSessionDto['responses'] = [];

	withResponses(responses: GetQuizSessionDto['responses']) {
		this.responses = responses;
		return this;
	}

	build(): GetQuizSessionDto {
		return {
			...super.build(),
			responses: this.responses,
		};
	}
}

export const buildGetQuizSession = () => new GetQuizSessionBuilder();
