import type { ValidatedAccessTokenPayload } from '../interfaces/authentication/validatedAccessTokenPayload.interface';

declare global {
	namespace Express {
		interface Request {
			user: ValidatedAccessTokenPayload;
		}
	}
}
