import { IS_PUBLIC } from 'src/common/decorators/public.decorator';

import type { ExecutionContext } from '@nestjs/common/interfaces';
import type { Reflector } from '@nestjs/core';

export function isPublicRoute(
	reflector: Reflector,
	handler: ReturnType<ExecutionContext['getHandler']>,
	classType: ReturnType<ExecutionContext['getClass']>,
) {
	return (
		reflector.getAllAndOverride<boolean>(IS_PUBLIC, [handler, classType]) ??
		false
	);
}
