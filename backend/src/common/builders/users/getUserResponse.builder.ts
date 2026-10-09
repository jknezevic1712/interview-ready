import { createId } from '@paralleldrive/cuid2';
import { GetUserLiteResponseBuilder } from './getUserLiteResponse.builder';

import type { GetUserResponse } from 'src/common/dtos/users/getUserResponse.dto';

class GetUserResponseBuilder
	extends GetUserLiteResponseBuilder
	implements GetUserResponse
{
	sessionId = createId();

	withSessionId(sessionId: GetUserResponse['sessionId']) {
		this.sessionId = sessionId;
		return this;
	}

	build(): GetUserResponse {
		return {
			...super.build(),
			sessionId: this.sessionId,
		};
	}
}

export const buildGetUserResponse = () => new GetUserResponseBuilder();
