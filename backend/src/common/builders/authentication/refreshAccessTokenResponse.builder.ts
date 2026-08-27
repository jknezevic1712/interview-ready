import type { RefreshAccessTokenResponseDto } from 'src/common/dtos/authentication/refreshAccessTokenResponse.dto';

class RefreshAccessTokenBuilder implements RefreshAccessTokenResponseDto {
	accessToken = 'qwertzuiop';

	withAccessToken(token: RefreshAccessTokenResponseDto['accessToken']) {
		this.accessToken = token;
		return this;
	}

	build(): RefreshAccessTokenResponseDto {
		return {
			accessToken: this.accessToken,
		};
	}
}

export const buildRefreshAccessToken = new RefreshAccessTokenBuilder();
