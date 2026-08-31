import { UserSession } from 'src/common/types/client';
import { GetUserLite } from './getUserLite.dto';

export class GetUser extends GetUserLite {
	sessionId!: UserSession['id'];
}
