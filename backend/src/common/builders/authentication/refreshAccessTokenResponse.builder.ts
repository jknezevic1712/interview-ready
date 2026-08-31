import type { RefreshAccessTokenResponse } from 'src/common/dtos/authentication/refreshAccessTokenResponse.dto';

class RefreshAccessTokenResponseBuilder implements RefreshAccessTokenResponse {
	accessToken = 'qwertzuiop';

	withAccessToken(token: RefreshAccessTokenResponse['accessToken']) {
		this.accessToken = token;
		return this;
	}

	build(): RefreshAccessTokenResponse {
		return {
			accessToken: this.accessToken,
		};
	}
}

export const buildRefreshAccessTokenResponse = () =>
	new RefreshAccessTokenResponseBuilder();
