import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { TokenService } from './services/token.service';

@Module({
	controllers: [AuthenticationController],
	providers: [AuthenticationService, TokenService],
	imports: [
		UsersModule,
		JwtModule.register({
			global: true,
		}),
	],
	exports: [TokenService],
})
export class AuthenticationModule {}
