import { GetUserResponse } from 'src/common/dtos/users/getUserResponse.dto';
import { AccessTokenPayload } from 'src/common/interfaces/authentication/accessTokenPayload.interface';

export const toAccessTokenPayload = (
	data: GetUserResponse,
): AccessTokenPayload => {
	return {
		sub: data.id,
		role: data.role,
		sessionId: data.sessionId,
	};
};
