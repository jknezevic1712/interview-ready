import { GetUserResponse } from '../users/getUserResponse.dto';

export class AuthenticationResponse {
	accessToken!: string;
	refreshToken!: string;
	user!: GetUserResponse;
	sessionId!: string;
}
