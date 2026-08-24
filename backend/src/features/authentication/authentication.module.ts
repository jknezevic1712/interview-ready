import { Module } from '@nestjs/common';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { UsersModule } from '../users/users.module';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/env';

@Module({
	controllers: [AuthenticationController],
	providers: [AuthenticationService, TokenService],
	imports: [
		UsersModule,
		JwtModule.register({
			global: true,
			secret: env.JWT_SECRET,
			signOptions: { expiresIn: '15m' },
		}),
	],
	exports: [TokenService],
})
export class AuthenticationModule {}
