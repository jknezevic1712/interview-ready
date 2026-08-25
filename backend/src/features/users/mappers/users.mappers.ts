import { GetUserDto } from 'src/common/dtos/users/getUser.dto';
import { UserLitePayload, UserPayload } from '../utilities/users.selects';
import { GetUserLiteDto } from 'src/common/dtos/users/getUserLite.dto';

export const toGetUserLiteDto = (data: UserLitePayload): GetUserLiteDto => {
	return {
		id: data.id,
		name: data.name,
		email: data.email,
		role: data.role,
	};
};

export const toGetUserDto = (data: UserPayload): GetUserDto => {
	return {
		id: data.id,
		name: data.name,
		email: data.email,
		role: data.role,
		sessionId: data.userSessions[0]?.id,
	};
};
