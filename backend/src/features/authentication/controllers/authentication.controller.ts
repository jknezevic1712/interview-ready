import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthenticationResponse } from 'src/common/dtos/authentication/authenticationResponse.dto';
import { LoginUser } from 'src/common/dtos/authentication/loginUser.dto';
import { RefreshAccessTokenResponse } from 'src/common/dtos/authentication/refreshAccessTokenResponse.dto';
import { CreateUser } from 'src/common/dtos/users/createUser.dto';
import { env } from 'src/env';
import { AuthenticationService } from '../services/authentication.service';

import type { Request, Response } from 'express';

@Controller('authentication')
export class AuthenticationController {
	constructor(private readonly authenticationService: AuthenticationService) {}

	@Throttle({
		default: {
			limit: 5,
			ttl: 60000,
		},
	})
	@Public()
	@Post('register')
	registerViaEmailAndPassword(
		@Body() data: CreateUser,
	): Promise<AuthenticationResponse> {
		return this.authenticationService.registerViaEmailAndPassword(data);
	}

	@Throttle({
		default: {
			limit: 5,
			ttl: 60000,
		},
	})
	@Public()
	@Post('login')
	loginViaEmailAndPassword(
		@Body() data: LoginUser,
	): Promise<AuthenticationResponse> {
		return this.authenticationService.loginViaEmailAndPassword(data);
	}

	@Throttle({
		default: {
			limit: 15,
			ttl: 60000,
		},
	})
	@Public()
	@Post('refresh')
	async refreshAccessToken(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
	): Promise<RefreshAccessTokenResponse> {
		const oldRefreshToken = request.cookies.refresh_token;
		const { accessToken, refreshToken } =
			await this.authenticationService.refreshAccessToken(oldRefreshToken);

		response.cookie('refresh_token', refreshToken, {
			httpOnly: true,
			secure: env.NODE_ENV === 'production',
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
			secure: env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/authentication',
		});
	}
}
