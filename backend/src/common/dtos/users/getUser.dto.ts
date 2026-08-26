import { UserSession } from 'src/common/types/client';
import { GetUserLiteDto } from './getUserLite.dto';

export class GetUserDto extends GetUserLiteDto {
	sessionId!: UserSession['id'];
}
