import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthenticationResponseDto } from 'src/common/dtos/authentication/authenticationResponse.dto';
import { LoginUserDto } from 'src/common/dtos/authentication/loginUser.dto';
import { RefreshAccessTokenResponseDto } from 'src/common/dtos/authentication/refreshAccessTokenResponse.dto';
import { CreateUserDto } from 'src/common/dtos/users/createUser.dto';
import { env } from 'src/env';
import { AuthenticationService } from '../services/authentication.service';

import type { Request, Response } from 'express';

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
		const oldRefreshToken = request.cookies.refresh_token;
		const { accessToken, refreshToken } =
			await this.authenticationService.refreshAccessToken(oldRefreshToken);

		response.cookie('refresh_token', refreshToken, {
			httpOnly: true,
			secure: env.ENV === 'production',
			sameSite: 'lax',
			path: '/authentication',
		});

		return {
			accessToken,
		};
	}

	@Public()
	@Post('logout')
	async logout(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
	): Promise<void> {
		await this.authenticationService.logoutUser(request.cookies.refresh_token);

		response.clearCookie('refresh_token', {
			httpOnly: true,
			secure: env.ENV === 'production',
			sameSite: 'lax',
			path: '/authentication',
		});
	}
}
