import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dtos/authentication/createUser.dto';
import { AuthenticationService } from '../services/authentication.service';
import { GetUserDto } from 'src/common/dtos/users/getUser.dto';
import { LoginUserDto } from 'src/common/dtos/authentication/loginUser.dto';

@Controller('authentication')
export class AuthenticationController {
	constructor(private readonly authenticationService: AuthenticationService) {}

	@Post('register')
	registerViaEmailAndPassword(
		@Body() data: CreateUserDto,
	): Promise<GetUserDto> {
		return this.authenticationService.registerViaEmailAndPassword(data);
	}

	@Post('login')
	loginViaEmailAndPassword(@Body() data: LoginUserDto): Promise<GetUserDto> {
		// TODO: add generating and returning of JWT token
		return this.authenticationService.loginViaEmailAndPassword(data);
	}
}
