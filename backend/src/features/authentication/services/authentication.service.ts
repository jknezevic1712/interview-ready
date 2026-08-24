import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dtos/authentication/createUser.dto';
import { UserRegistrationData } from 'src/common/interfaces/authentication/userRegistrationData.interface';
import { UsersService } from 'src/features/users/services/users.service';
import { toStringHash } from '../utilities/stringTransform';

@Injectable()
export class AuthenticationService {
	constructor(private readonly usersService: UsersService) {}

	async registerViaEmailAndPassword(data: CreateUserDto) {
		const userExists = await this.usersService.doesUserExist(data.email);

		if (userExists) {
			throw new ConflictException(
				`User with ${data.email} already exists. Please continue to log in`,
			);
		}

		const registrationData: UserRegistrationData = {
			email: data.email,
			name: data.name,
			passwordHash: toStringHash(data.password),
		};

		return this.usersService.registerUser(registrationData);
	}
}
