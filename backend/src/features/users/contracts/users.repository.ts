import { UserRegistrationData } from 'src/common/interfaces/authentication/userRegistrationData.interface';
import {
	UserLitePayload,
	UserSessionPayload,
} from '../utilities/users.selects';
import { CredentialProvider } from 'src/common/types/enums';
import {
	UserCredentialLocalData,
	UserCredentialOAuthData,
} from 'src/common/interfaces/user/userCredentialData.interface';
import { CreateSessionData } from 'src/common/interfaces/authentication/createSessionData.interface';
import { UpdateSessionData } from 'src/common/interfaces/authentication/updateSessionData.interface';

export interface IUsersRepository {
	getUser(email: string): Promise<UserLitePayload | null>;
	getUserById(id: string): Promise<UserLitePayload | null>;
	getUserCredential(
		provider: typeof CredentialProvider.LOCAL,
		email: string,
	): Promise<UserCredentialLocalData | null>;
	getUserCredential(
		provider:
			typeof CredentialProvider.GOOGLE | typeof CredentialProvider.GITHUB,
		email: string,
	): Promise<UserCredentialOAuthData | null>;
	getUserCredential(
		provider: CredentialProvider,
		email: string,
	): Promise<UserCredentialLocalData | UserCredentialOAuthData | null>;
	registerUser(data: UserRegistrationData): Promise<UserLitePayload>;
	getSession(sessionId: string): Promise<UserSessionPayload | null>;
	createSession(data: CreateSessionData): Promise<UserSessionPayload>;
	updateSession(data: UpdateSessionData): Promise<UserSessionPayload>;
	logoutUser(sessionId: string): Promise<void>;
}
