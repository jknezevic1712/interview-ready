import { SetMetadata } from '@nestjs/common';

import type { Role } from '../types/enums';

export const AUTHORIZE_KEY = 'roles';
export const Authorize = (roles: Role[]) => SetMetadata(AUTHORIZE_KEY, roles);
