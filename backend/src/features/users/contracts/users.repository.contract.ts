import { UpdateSessionData } from 'src/common/interfaces/authentication/updateSessionData.interface';
import { UserRegistrationData } from 'src/common/interfaces/authentication/userRegistrationData.interface';
import {
	UserCredentialLocalData,
	UserCredentialOAuthData,
} from 'src/common/interfaces/user/userCredentialData.interface';
import { CredentialProvider } from 'src/common/types/enums';
import {
	UserLitePayload,
	UserSessionPayload,
} from '../utilities/users.selects';

export interface IUsersRepository {
	getUser(email: string): Promise<UserLitePayload | null>;
	getUserById(id: string): Promise<UserLitePayload | null>;
	getUserCredential(
		provider: typeof CredentialProvider.LOCAL,
		email: string,
	): Promise<UserCredentialLocalData | null>;
	getUserCredential(
		provider:
			| typeof CredentialProvider.GOOGLE
			| typeof CredentialProvider.GITHUB,
		email: string,
	): Promise<UserCredentialOAuthData | null>;
	getUserCredential(
		provider: CredentialProvider,
		email: string,
	): Promise<UserCredentialLocalData | UserCredentialOAuthData | null>;
	registerUser(data: UserRegistrationData): Promise<UserLitePayload>;
	getSession(sessionId: string): Promise<UserSessionPayload | null>;
	createSession(userId: string): Promise<UserSessionPayload>;
	updateSession(data: UpdateSessionData): Promise<UserSessionPayload>;
	logoutUser(sessionId: string): Promise<void>;
}
