import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Authorize } from 'src/common/decorators/authorize.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthenticationResponse } from 'src/common/dtos/authentication/authenticationResponse.dto';
import { LoginUserRequest } from 'src/common/dtos/authentication/loginUserRequest.dto';
import { RefreshAccessTokenResponse } from 'src/common/dtos/authentication/refreshAccessTokenResponse.dto';
import { CreateUserRequest } from 'src/common/dtos/users/createUserRequest.dto';
import { GetUserLiteResponse } from 'src/common/dtos/users/getUserLiteResponse.dto';
import { Role } from 'src/common/types/enums';
import { env } from 'src/env';
import { AuthenticationService } from '../services/authentication.service';

import type { Request, Response } from 'express';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
	constructor(private readonly authenticationService: AuthenticationService) {}

	@ApiCreatedResponse({ type: AuthenticationResponse })
	@Throttle({
		default: {
			limit: 5,
			ttl: 60000,
		},
	})
	@Public()
	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	registerViaEmailAndPassword(
		@Body() data: CreateUserRequest,
	): Promise<AuthenticationResponse> {
		return this.authenticationService.registerViaEmailAndPassword(data);
	}

	@ApiCreatedResponse({ type: AuthenticationResponse })
	@Throttle({
		default: {
			limit: 5,
			ttl: 60000,
		},
	})
	@Public()
	@Post('login')
	@HttpCode(HttpStatus.CREATED)
	loginViaEmailAndPassword(
		@Body() data: LoginUserRequest,
	): Promise<AuthenticationResponse> {
		return this.authenticationService.loginViaEmailAndPassword(data);
	}

	@ApiCreatedResponse({ type: RefreshAccessTokenResponse })
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

	@Authorize([Role.ADMIN, Role.USER])
	@Get('user')
	async getUser(@Req() request: Request): Promise<GetUserLiteResponse> {
		const refreshToken = request.cookies.refresh_token;
		return this.authenticationService.getUserData(refreshToken);
	}
}
