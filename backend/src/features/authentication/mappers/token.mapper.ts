import { GetUser } from 'src/common/dtos/users/getUser.dto';
import { AccessTokenPayload } from 'src/common/interfaces/authentication/accessTokenPayload.interface';

export const toAccessTokenPayload = (data: GetUser): AccessTokenPayload => {
	return {
		sub: data.id,
		role: data.role,
		sessionId: data.sessionId,
	};
};
