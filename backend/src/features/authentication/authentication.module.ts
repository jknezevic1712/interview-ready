import { Module } from '@nestjs/common';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { AUTHENTICATION_REPOSITORY } from './tokens/authentication.token';
import { AuthenticationRepository } from './repositories/authentication.repository';

@Module({
	controllers: [AuthenticationController],
	providers: [
		AuthenticationService,
		{
			provide: AUTHENTICATION_REPOSITORY,
			useClass: AuthenticationRepository,
		},
	],
})
export class AuthenticationModule {}
