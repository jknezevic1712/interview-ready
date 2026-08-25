import { Role } from 'src/common/types/enums';

export interface JwtPayload {
	sub: string;
	email: string;
	role: Role;
}
