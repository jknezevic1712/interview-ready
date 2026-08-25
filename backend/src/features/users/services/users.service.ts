import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USERS_REPOSITORY } from '../tokens/users.token';
import type { IUsersRepository } from '../contracts/users.repository';
import { GetUserDto } from 'src/common/dtos/users/getUser.dto';
import { UserRegistrationData } from 'src/common/interfaces/authentication/userRegistrationData.interface';
import { toGetUserDto } from '../mappers/users.mappers';
import { CredentialProvider } from 'src/common/types/enums';
import {
	UserCredentialLocalData,
	UserCredentialOAuthData,
} from 'src/common/interfaces/user/userCredentialData.interface';

@Injectable()
export class UsersService {
	constructor(
		@Inject(USERS_REPOSITORY)
		private readonly usersRepository: IUsersRepository,
	) {}

	async doesUserExist(email: string): Promise<boolean> {
		const user = await this.usersRepository.getUser(email);
		return !!user;
	}

	async getUserCredential(
		provider: typeof CredentialProvider.LOCAL,
		email: string,
	): Promise<UserCredentialLocalData | null>;
	async getUserCredential(
		provider:
			typeof CredentialProvider.GOOGLE | typeof CredentialProvider.GITHUB,
		email: string,
	): Promise<UserCredentialOAuthData | null>;
	async getUserCredential(
		provider: CredentialProvider,
		email: string,
	): Promise<UserCredentialLocalData | UserCredentialOAuthData | null> {
		const userCredentials = await this.usersRepository.getUserCredential(
			provider,
			email,
		);

		return userCredentials;
	}

	async getUser(email: string): Promise<GetUserDto> {
		const user = await this.usersRepository.getUser(email);

		if (!user) {
			throw new NotFoundException(`User with email ${email} not found`);
		}

		return toGetUserDto(user);
	}

	async getUserById(id: string): Promise<GetUserDto> {
		const user = await this.usersRepository.getUserById(id);

		if (!user) {
			throw new NotFoundException(`User not found`);
		}

		return toGetUserDto(user);
	}

	async registerUser(data: UserRegistrationData): Promise<GetUserDto> {
		const user = await this.usersRepository.registerUser(data);
		return toGetUserDto(user);
	}
}
