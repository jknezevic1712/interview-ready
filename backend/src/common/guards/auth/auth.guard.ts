import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC } from 'src/common/decorators/public.decorator';
import { env } from 'src/env';
import { TokenService } from 'src/features/authentication/services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly tokenService: TokenService,
		private readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		if (this.isPublicRoute(context.getHandler(), context.getClass())) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);

		if (!token) {
			throw new UnauthorizedException('Unauthorized access, please log in');
		}

		try {
			const payload = await this.tokenService.validateToken(
				token,
				env.JWT_ACCESS_TOKEN_SECRET,
			);
			request.user = payload;
		} catch (_error) {
			throw new UnauthorizedException('Unauthorized access, please log in');
		}

		return true;
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
