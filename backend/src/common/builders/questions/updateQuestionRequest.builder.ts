import { createId } from '@paralleldrive/cuid2';
import { CreateQuestionRequestBuilder } from './createQuestionRequest.builder';

import type { UpdateQuestionRequest } from 'src/common/dtos/questions/updateQuestionRequest.dto';

class UpdateQuestionRequestBuilder
	extends CreateQuestionRequestBuilder
	implements UpdateQuestionRequest
{
	questionId = createId();

	withQuestionId(questionId: UpdateQuestionRequest['questionId']) {
		this.questionId = questionId;
		return this;
	}

	override build(): UpdateQuestionRequest {
		return {
			...super.build(),
			questionId: this.questionId,
		};
	}
}

export const buildUpdateQuestionRequest = () =>
	new UpdateQuestionRequestBuilder();
