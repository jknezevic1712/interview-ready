import { GetUserLite } from 'src/common/dtos/users/getUserLite.dto';
import { UserLitePayload } from '../utilities/users.selects';

export const toGetUserLite = (data: UserLitePayload): GetUserLite => {
	return {
		id: data.id,
		name: data.name,
		email: data.email,
		role: data.role,
	};
};
