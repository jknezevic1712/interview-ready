import { UserSession } from 'src/common/types/client';
import { GetUserLiteResponse } from './getUserLiteResponse.dto';

export class GetUserResponse extends GetUserLiteResponse {
	sessionId!: UserSession['id'];
}
