import { GetUserLiteDto } from 'src/common/dtos/users/getUserLite.dto';
import { UserLitePayload } from '../utilities/users.selects';

export const toGetUserLiteDto = (data: UserLitePayload): GetUserLiteDto => {
	return {
		id: data.id,
		name: data.name,
		email: data.email,
		role: data.role,
	};
};
