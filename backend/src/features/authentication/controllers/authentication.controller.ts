import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dtos/authentication/createUser.dto';
import { AuthenticationService } from '../services/authentication.service';
import { LoginUserDto } from 'src/common/dtos/authentication/loginUser.dto';
import { AuthenticationResponseDto } from 'src/common/dtos/authentication/authenticationResponse.dto';
import { Public } from 'src/common/decorators/public.decorator';
import type { Request, Response } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { env } from 'src/env';
import { RefreshAccessTokenResponseDto } from 'src/common/dtos/authentication/refreshAccessTokenResponse.dto';

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

	@Public()
	@Post('refresh')
	async refreshAccessToken(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
	): Promise<RefreshAccessTokenResponseDto> {
		const refreshToken = request.cookies.refresh_token;
		const newTokens =
			await this.authenticationService.refreshAccessToken(refreshToken);

		response.cookie('refresh_token', newTokens.refreshToken, {
			httpOnly: true,
			secure: env.ENV === 'production',
			sameSite: 'lax',
			path: '/authentication',
		});

		return {
			accessToken: newTokens.accessToken,
		};
	}

	@ApiBearerAuth()
	@Post('logout')
	logout(@Req() request: Request): Promise<void> {
		const refreshToken = request.cookies.refresh_token;
		return this.authenticationService.logoutUser(refreshToken);
	}
}
