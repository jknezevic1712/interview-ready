import { GetUserDto } from '../users/getUser.dto';

export class AuthenticationResponseDto {
	accessToken!: string;
	refreshToken!: string;
	user!: GetUserDto;
	sessionId!: string;
}
