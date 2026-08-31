import { GetUserLiteBuilder } from './getUserLite.builder';

import type { GetUser } from 'src/common/dtos/users/getUser.dto';

class GetUserBuilder extends GetUserLiteBuilder implements GetUser {
	sessionId = 'session-1';

	withSessionId(sessionId: GetUser['sessionId']) {
		this.sessionId = sessionId;
		return this;
	}

	build(): GetUser {
		return {
			...super.build(),
			sessionId: this.sessionId,
		};
	}
}

export const buildGetUser = () => new GetUserBuilder();
