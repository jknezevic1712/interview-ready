export interface RefreshTokenPayload {
	sub: string;
	sessionId: string;
	exp?: number;
	iat?: number;
}
