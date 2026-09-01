import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './services/users.service';
import { USERS_REPOSITORY } from './tokens/users.token';

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
