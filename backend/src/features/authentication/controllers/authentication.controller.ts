import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dtos/authentication/createUser.dto';
import { AuthenticationService } from '../services/authentication.service';
import { LoginUserDto } from 'src/common/dtos/authentication/loginUser.dto';
import { AuthenticationResponseDto } from 'src/common/dtos/authentication/authenticationResponse.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('authentication')
export class AuthenticationController {
	constructor(private readonly authenticationService: AuthenticationService) {}

	@Public()
	@Post('register')
	registerViaEmailAndPassword(
		@Body() data: CreateUserDto,
	): Promise<AuthenticationResponseDto> {
		return this.authenticationService.registerViaEmailAndPassword(data);
	}

	@Public()
	@Post('login')
	loginViaEmailAndPassword(
		@Body() data: LoginUserDto,
	): Promise<AuthenticationResponseDto> {
		return this.authenticationService.loginViaEmailAndPassword(data);
	}
}
