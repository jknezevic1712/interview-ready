export interface UpdateSessionData {
	sessionId: string;
	expiresAt: Date;
	refreshTokenHash: string;
}
