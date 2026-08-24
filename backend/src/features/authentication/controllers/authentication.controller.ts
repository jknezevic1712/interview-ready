import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dtos/authentication/createUser.dto';
import { AuthenticationService } from '../services/authentication.service';
import { GetUserDto } from 'src/common/dtos/users/getUser.dto';

@Controller('authentication')
export class AuthenticationController {
	constructor(private readonly authenticationService: AuthenticationService) {}

	@Post('register')
	registerViaEmailAndPassword(
		@Body() data: CreateUserDto,
	): Promise<GetUserDto> {
		return this.authenticationService.registerViaEmailAndPassword(data);
	}
}
