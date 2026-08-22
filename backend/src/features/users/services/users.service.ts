import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from '../tokens/users.token';
import type { IUsersRepository } from '../contracts/users.contract';

@Injectable()
export class UsersService {
	constructor(
		@Inject(USERS_REPOSITORY)
		private readonly usersRepository: IUsersRepository,
	) {}

	async getUser(userId: string) {}
}
