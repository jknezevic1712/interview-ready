import { RefreshTokenPayload } from './refreshTokenPayload.interface';

export interface ValidatedRefreshTokenPayload extends RefreshTokenPayload {
	exp: number;
	iat: number;
}
