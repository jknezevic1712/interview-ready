import { GetQuizSessionBaseBuilder } from './getQuizSessionBase.builder';

import type { GetQuizSessionLiteDto } from 'src/common/dtos/quizSession/getQuizSessionLite.dto';

export class GetQuizSessionLiteBuilder
	extends GetQuizSessionBaseBuilder
	implements GetQuizSessionLiteDto
{
	responses: GetQuizSessionLiteDto['responses'] = null;

	build(): GetQuizSessionLiteDto {
		return {
			...super.build(),
			responses: this.responses,
		};
	}
}

export const buildGetQuizSessionLite = () => new GetQuizSessionLiteBuilder();
