import { buildGetUser } from '../users/getUser.builder';

import type { AuthenticationResponse } from 'src/common/dtos/authentication/authenticationResponse.dto';

class AuthenticationResponseBuilder implements AuthenticationResponse {
	accessToken = 'qwertzuiop';
	refreshToken = '12345678';
	sessionId = 'q1w2e3r4t5';
	user: AuthenticationResponse['user'] = buildGetUser().build();

	withAccessToken(token: AuthenticationResponse['accessToken']) {
		this.accessToken = token;
		return this;
	}

	withRefreshToken(token: AuthenticationResponse['refreshToken']) {
		this.refreshToken = token;
		return this;
	}

	withSessionId(sessionId: AuthenticationResponse['sessionId']) {
		this.sessionId = sessionId;
		return this;
	}

	withUser(user: AuthenticationResponse['user']) {
		this.user = user;
		return this;
	}

	build(): AuthenticationResponse {
		return {
			accessToken: this.accessToken,
			refreshToken: this.refreshToken,
			sessionId: this.sessionId,
			user: this.user,
		};
	}
}

export const buildAuthenticationResponse = () =>
	new AuthenticationResponseBuilder();
