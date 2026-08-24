import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/common/dtos/authentication/createUser.dto';
import { UserRegistrationData } from 'src/common/interfaces/authentication/userRegistrationData.interface';
import { UsersService } from 'src/features/users/services/users.service';
import {
	compareStringHashes,
	toStringHash,
} from '../utilities/stringTransform';
import { LoginUserDto } from 'src/common/dtos/authentication/loginUser.dto';
import { CredentialProvider } from 'src/common/types/enums';
import { TokenService } from './token.service';
import { AuthenticationResponseDto } from 'src/common/dtos/authentication/authenticationResponse.dto';

@Injectable()
export class AuthenticationService {
	constructor(
		private readonly usersService: UsersService,
		private readonly tokenService: TokenService,
	) {}

	async registerViaEmailAndPassword(
		data: CreateUserDto,
	): Promise<AuthenticationResponseDto> {
		const userExists = await this.usersService.doesUserExist(data.email);

		if (userExists) {
			throw new ConflictException(
				`User with ${data.email} already exists. Please continue to log in`,
			);
		}

		const passwordHash = await toStringHash(data.password);
		const registrationData: UserRegistrationData = {
			email: data.email,
			name: data.name,
			passwordHash,
		};

		const user = await this.usersService.registerUser(registrationData);
		const jwtTokens = await this.tokenService.generateJwtToken(user);

		return {
			accessToken: jwtTokens,
			refreshToken: jwtTokens,
			user,
		};
	}

	async loginViaEmailAndPassword(
		data: LoginUserDto,
	): Promise<AuthenticationResponseDto> {
		const userCredentials = await this.usersService.getUserCredential(
			CredentialProvider.LOCAL,
			data.email,
		);

		if (!userCredentials?.passwordHash) {
			// TODO: check what to do with a case when user was logging in via other auth methods and then tried logging in via email/pass
			throw new NotFoundException(
				`User (${data.email}) is not registered via this authentication method. Please register or use other methods of authentication`,
			);
		}

		const passwordCheck = await compareStringHashes(
			data.password,
			userCredentials.passwordHash,
		);
		if (!passwordCheck) {
			throw new UnauthorizedException('Please check your credentials');
		}

		const user = await this.usersService.getUser(data.email);
		const jwtTokens = await this.tokenService.generateJwtToken(user);

		return {
			accessToken: jwtTokens,
			refreshToken: jwtTokens,
			user,
		};
	}
}
