import { UserLitePayload } from '../utilities/users.selects';
import { GetUserLiteDto } from 'src/common/dtos/users/getUserLite.dto';

export const toGetUserLiteDto = (data: UserLitePayload): GetUserLiteDto => {
	return {
		id: data.id,
		name: data.name,
		email: data.email,
		role: data.role,
	};
};
