import { CreateQuestionBuilder } from './createQuestion.builder';

import type { UpdateQuestionDto } from 'src/common/dtos/questions/updateQuestion.dto';

class UpdateQuestionBuilder
	extends CreateQuestionBuilder
	implements UpdateQuestionDto
{
	questionId = 'question-id-1';

	withQuestionId(questionId: UpdateQuestionDto['questionId']) {
		this.questionId = questionId;
		return this;
	}

	override build(): UpdateQuestionDto {
		return {
			...super.build(),
			questionId: this.questionId,
		};
	}
}

export const buildUpdateQuestion = new UpdateQuestionBuilder();
