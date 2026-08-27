import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import type { AccessTokenPayload } from '../interfaces/authentication/accessTokenPayload.interface';
import type { ValidatedAccessTokenPayload } from '../interfaces/authentication/validatedAccessTokenPayload.interface';

export const CurrentUser = createParamDecorator(
	(_data: unknown, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest();
		const { sub, sessionId, role } =
			request.user as ValidatedAccessTokenPayload;

		return { sub, sessionId, role } satisfies AccessTokenPayload;
	},
);
