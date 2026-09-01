export interface UserCredentialLocalData {
	passwordHash: string | null;
}

export interface UserCredentialOAuthData {
	providerUserId: string | null;
}
