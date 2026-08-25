import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from 'src/features/authentication/services/token.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC } from 'src/common/decorators/public.decorator';
import { env } from 'src/env';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly tokenService: TokenService,
		private readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		if (this.checkIsPublicRoute(context.getHandler(), context.getClass())) {
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
			request['user'] = payload;
		} catch (error) {
			throw new UnauthorizedException('Unauthorized access, please log in');
		}

		return true;
	}

	private checkIsPublicRoute(handler: Function, classType: any) {
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
