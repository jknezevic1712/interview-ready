import { Module } from '@nestjs/common';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { UsersModule } from '../users/users.module';

@Module({
	controllers: [AuthenticationController],
	providers: [AuthenticationService],
	imports: [UsersModule],
})
export class AuthenticationModule {}
