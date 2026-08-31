import { GetUserLiteResponseBuilder } from './getUserLiteResponse.builder';

import type { GetUserResponse } from 'src/common/dtos/users/getUserResponse.dto';

class GetUserResponseBuilder
	extends GetUserLiteResponseBuilder
	implements GetUserResponse
{
	sessionId = 'session-1';

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
