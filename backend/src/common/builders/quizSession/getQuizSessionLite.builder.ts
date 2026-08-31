import { GetQuizSessionBaseBuilder } from './getQuizSessionBase.builder';

import type { GetQuizSessionLite } from 'src/common/dtos/quizSession/getQuizSessionLite.dto';

export class GetQuizSessionLiteBuilder
	extends GetQuizSessionBaseBuilder
	implements GetQuizSessionLite
{
	responses: GetQuizSessionLite['responses'] = null;

	build(): GetQuizSessionLite {
		return {
			...super.build(),
			responses: this.responses,
		};
	}
}

export const buildGetQuizSessionLite = () => new GetQuizSessionLiteBuilder();
