import { UserRegistrationData } from 'src/common/interfaces/authentication/userRegistrationData.interface';
import { UserPayload } from '../utilities/users.selects';
import { CredentialProvider } from 'src/common/types/enums';
import {
	UserCredentialLocalData,
	UserCredentialOAuthData,
} from 'src/common/interfaces/user/userCredentialData.interface';

export interface IUsersRepository {
	getUser(email: string): Promise<UserPayload | null>;
	getUserById(id: string): Promise<UserPayload | null>;
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
	registerUser(data: UserRegistrationData): Promise<UserPayload>;
}
