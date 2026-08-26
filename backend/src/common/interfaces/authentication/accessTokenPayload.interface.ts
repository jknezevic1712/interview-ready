import { Role } from 'src/common/types/enums'
import { RefreshTokenPayload } from './refreshTokenPayload.interface'

export interface AccessTokenPayload extends RefreshTokenPayload {
	role: Role;
}
