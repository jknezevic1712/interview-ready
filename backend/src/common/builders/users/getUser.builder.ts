import { GetUserLiteBuilder } from './getUserLite.builder';

import type { GetUserDto } from 'src/common/dtos/users/getUser.dto';

class GetUserBuilder extends GetUserLiteBuilder implements GetUserDto {
	sessionId = 'session-1';

	withSessionId(sessionId: GetUserDto['sessionId']) {
		this.sessionId = sessionId;
		return this;
	}

	build(): GetUserDto {
		return {
			...super.build(),
			sessionId: this.sessionId,
		};
	}
}

export const buildGetUser = () => new GetUserBuilder();
