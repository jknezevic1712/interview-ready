import { buildGetUser } from '../users/getUser.builder';

import type { AuthenticationResponseDto } from 'src/common/dtos/authentication/authenticationResponse.dto';

class AuthenticationResponseBuilder implements AuthenticationResponseDto {
	accessToken = 'qwertzuiop';
	refreshToken = '12345678';
	sessionId = 'q1w2e3r4t5';
	user: AuthenticationResponseDto['user'] = buildGetUser().build();

	withAccessToken(token: AuthenticationResponseDto['accessToken']) {
		this.accessToken = token;
		return this;
	}

	withRefreshToken(token: AuthenticationResponseDto['refreshToken']) {
		this.refreshToken = token;
		return this;
	}

	withSessionId(sessionId: AuthenticationResponseDto['sessionId']) {
		this.sessionId = sessionId;
		return this;
	}

	withUser(user: AuthenticationResponseDto['user']) {
		this.user = user;
		return this;
	}

	build(): AuthenticationResponseDto {
		return {
			accessToken: this.accessToken,
			refreshToken: this.refreshToken,
			sessionId: this.sessionId,
			user: this.user,
		};
	}
}

export const buildAuthenticationResponse = new AuthenticationResponseBuilder();
