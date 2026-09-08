import type { CreateQuizSessionRequest } from 'src/common/dtos/quizSession/createQuizSessionRequest.dto';

export class CreateQuizSessionRequestBuilder
	implements CreateQuizSessionRequest
{
	title = 'Quiz session 1';

	withTitle(title: CreateQuizSessionRequest['title']) {
		this.title = title;
		return this;
	}

	build(): CreateQuizSessionRequest {
		return {
			title: this.title,
		};
	}
}

export const buildCreateQuizSessionRequest = () =>
	new CreateQuizSessionRequestBuilder();
