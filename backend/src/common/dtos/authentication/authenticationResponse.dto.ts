import { GetUser } from '../users/getUser.dto';

export class AuthenticationResponse {
	accessToken!: string;
	refreshToken!: string;
	user!: GetUser;
	sessionId!: string;
}
