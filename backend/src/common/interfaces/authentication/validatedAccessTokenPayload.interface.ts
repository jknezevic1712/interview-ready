import type { AccessTokenPayload } from './accessTokenPayload.interface';

export interface ValidatedAccessTokenPayload extends AccessTokenPayload {
	exp: number;
	iat: number;
}
