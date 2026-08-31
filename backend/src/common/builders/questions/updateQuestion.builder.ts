import { CreateQuestionBuilder } from './createQuestion.builder';

import type { UpdateQuestion } from 'src/common/dtos/questions/updateQuestion.dto';

class UpdateQuestionBuilder
	extends CreateQuestionBuilder
	implements UpdateQuestion
{
	questionId = 'question-id-1';

	withQuestionId(questionId: UpdateQuestion['questionId']) {
		this.questionId = questionId;
		return this;
	}

	override build(): UpdateQuestion {
		return {
			...super.build(),
			questionId: this.questionId,
		};
	}
}

export const buildUpdateQuestion = () => new UpdateQuestionBuilder();
