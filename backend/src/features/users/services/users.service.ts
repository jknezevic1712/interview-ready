import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USERS_REPOSITORY } from '../tokens/users.token';
import type { IUsersRepository } from '../contracts/users.repository';
import { GetUserDto } from 'src/common/dtos/users/getUser.dto';
import { UserRegistrationData } from 'src/common/interfaces/authentication/userRegistrationData.interface';
import { toGetUserDto } from '../mappers/users.mappers';

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

	async getUser(email: string): Promise<GetUserDto> {
		const user = await this.usersRepository.getUser(email);

		if (!user) {
			throw new NotFoundException(`User with email ${email} not found`);
		}

		return toGetUserDto(user);
	}

	async registerUser(data: UserRegistrationData): Promise<GetUserDto> {
		const user = await this.usersRepository.registerUser(data);
		return toGetUserDto(user);
	}
}
