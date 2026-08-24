import { GetUserDto } from 'src/common/dtos/users/getUser.dto';
import { UserPayload } from '../utilities/users.selects';

export const toGetUserDto = (data: UserPayload): GetUserDto => {
	return {
		id: data.id,
		name: data.name,
		email: data.email,
		role: data.role,
	};
};
