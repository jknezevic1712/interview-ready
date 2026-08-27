import { Reflector } from '@nestjs/core';
import { IS_PUBLIC } from 'src/common/decorators/public.decorator';

import type { ExecutionContext } from '@nestjs/common/interfaces';

export function isPublicRoute(
	getMetadataValue: Reflector['getAllAndOverride'],
	handler: ReturnType<ExecutionContext['getHandler']>,
	classType: ReturnType<ExecutionContext['getClass']>,
) {
	return getMetadataValue<boolean>(IS_PUBLIC, [handler, classType]);
}
