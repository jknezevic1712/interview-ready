import { GetUserLiteResponse } from 'src/common/dtos/users/getUserLiteResponse.dto';
import { UserLitePayload } from '../utilities/users.selects';

export const toGetUserLite = (data: UserLitePayload): GetUserLiteResponse => {
	return {
		id: data.id,
		name: data.name,
		email: data.email,
		role: data.role,
	};
};
