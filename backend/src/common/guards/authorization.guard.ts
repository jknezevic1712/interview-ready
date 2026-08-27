import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTHORIZE_KEY } from 'src/common/decorators/authorize.decorator';
import { Role } from 'src/common/types/enums';
import { isPublicRoute } from './helpers/auth.helper';

@Injectable()
export class AuthorizationGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const ctxHandler = context.getHandler();
		const ctxClass = context.getClass();

		if (isPublicRoute(this.reflector.getAllAndOverride, ctxHandler, ctxClass)) {
			return true;
		}

		const userRole = context.switchToHttp().getRequest().user.role;

		if (userRole === Role.ADMIN) {
			return true;
		}

		const allowedRoles = this.getAllowedRoles(ctxHandler, ctxClass);

		if (!allowedRoles?.length) {
			throw new ForbiddenException('No roles configured for this route');
		}

		if (!allowedRoles.includes(userRole)) {
			throw new ForbiddenException('Insufficient permissions');
		}

		return true;
	}

	private getAllowedRoles(
		handler: ReturnType<ExecutionContext['getHandler']>,
		classType: ReturnType<ExecutionContext['getClass']>,
	) {
		return this.reflector.getAllAndOverride<Role[]>(AUTHORIZE_KEY, [
			handler,
			classType,
		]);
	}
}
