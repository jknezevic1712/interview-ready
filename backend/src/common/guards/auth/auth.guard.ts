import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AUTHORIZE_KEY } from 'src/common/decorators/authorize.decorator';
import { IS_PUBLIC } from 'src/common/decorators/public.decorator';
import { Role } from 'src/common/types/enums';
import { env } from 'src/env';
import { TokenService } from 'src/features/authentication/services/token.service';

import type { ValidatedAccessTokenPayload } from 'src/common/interfaces/authentication/validatedAccessTokenPayload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly tokenService: TokenService,
		private readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const ctxHandler = context.getHandler();
		const ctxClass = context.getClass();

		if (this.isPublicRoute(ctxHandler, ctxClass)) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);

		if (!token) {
			throw new UnauthorizedException('Unauthorized access, please log in');
		}

		const validatedTokenData =
			await this.tokenService.validateToken<ValidatedAccessTokenPayload>(
				token,
				env.JWT_ACCESS_TOKEN_SECRET,
			);
		request.user = validatedTokenData;

		if (
			this.validateUserAccess(ctxHandler, ctxClass, validatedTokenData.role)
		) {
			return true;
		}

		return true;
	}

	private validateUserAccess(
		handler: ReturnType<ExecutionContext['getHandler']>,
		classType: ReturnType<ExecutionContext['getClass']>,
		userRole: Role,
	) {
		if (userRole === Role.ADMIN) {
			return true;
		}

		const allowedRoles = this.extractAllowedRoles(handler, classType);
		if (!allowedRoles.includes(userRole)) {
			throw new UnauthorizedException(
				'Unauthorized access due to lack of permissions',
			);
		}

		return true;
	}

	private extractAllowedRoles(
		handler: ReturnType<ExecutionContext['getHandler']>,
		classType: ReturnType<ExecutionContext['getClass']>,
	) {
		return this.reflector.getAllAndOverride<Role[]>(AUTHORIZE_KEY, [
			handler,
			classType,
		]);
	}

	private isPublicRoute(
		handler: ReturnType<ExecutionContext['getHandler']>,
		classType: ReturnType<ExecutionContext['getClass']>,
	) {
		return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
			handler,
			classType,
		]);
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
