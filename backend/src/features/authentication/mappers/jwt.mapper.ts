import { GetUserDto } from 'src/common/dtos/users/getUser.dto';
import { JwtPayload } from 'src/common/interfaces/authentication/jwtPayload.interface';

export const toJwtPayload = (data: GetUserDto): JwtPayload => {
	return {
		sub: data.id,
		email: data.email,
		role: data.role,
	};
};
