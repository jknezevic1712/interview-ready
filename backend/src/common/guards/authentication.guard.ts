import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { env } from 'src/env';
import { TokenService } from 'src/features/authentication/services/token.service';
import { isPublicRoute } from './helpers/auth.helper';

import type { ValidatedAccessTokenPayload } from 'src/common/interfaces/authentication/validatedAccessTokenPayload.interface';

@Injectable()
export class AuthenticationGuard implements CanActivate {
	constructor(
		private readonly tokenService: TokenService,
		private readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		if (
			isPublicRoute(this.reflector, context.getHandler(), context.getClass())
		) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const accessToken = this.extractAccessTokenFromHeader(request);

		if (!accessToken) {
			throw new UnauthorizedException('Unauthorized access, please log in');
		}

		request.user =
			await this.tokenService.validateToken<ValidatedAccessTokenPayload>(
				accessToken,
				env.JWT_ACCESS_TOKEN_SECRET,
			);

		return true;
	}

	private extractAccessTokenFromHeader(request: Request): string | undefined {
		const [type, accessToken] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? accessToken : undefined;
	}
}
