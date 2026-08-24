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

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly tokenService: TokenService,
		private readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		this.checkIsPublicRoute(context.getHandler(), context.getClass());

		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);

		if (!token) {
			throw new UnauthorizedException('Unauthorized access, please log in');
		}

		try {
			const payload = await this.tokenService.validateJwtToken(token);
			request['user'] = payload;
		} catch (error) {
			throw new UnauthorizedException('Unauthorized access, please log in');
		}

		return true;
	}

	private checkIsPublicRoute(handler: Function, classType: any) {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
			handler,
			classType,
		]);

		if (isPublic) {
			return true;
		}
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
