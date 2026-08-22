import { Inject, Injectable } from '@nestjs/common';
import { AUTHENTICATION_REPOSITORY } from '../tokens/authentication.token';
import type { IAuthenticationRepository } from '../contracts/authentication.contract';

@Injectable()
export class AuthenticationService {
	constructor(
		@Inject(AUTHENTICATION_REPOSITORY)
		private readonly authenticationRepository: IAuthenticationRepository,
	) {}
}
