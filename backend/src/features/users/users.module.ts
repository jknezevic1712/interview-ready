import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { USERS_REPOSITORY } from './tokens/users.token';
import { UsersRepository } from './repositories/users.repository';

@Module({
	providers: [
		UsersService,
		{
			provide: USERS_REPOSITORY,
			useClass: UsersRepository,
		},
	],
	exports: [UsersService],
})
export class UsersModule {}
