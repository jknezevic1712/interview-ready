import { UserRegistrationData } from 'src/common/interfaces/authentication/userRegistrationData.interface';
import { UserPayload } from '../utilities/users.selects';

export interface IUsersRepository {
	getUser(email: string): Promise<UserPayload | null>;
	registerUser(data: UserRegistrationData): Promise<UserPayload>;
}
