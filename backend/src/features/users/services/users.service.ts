import {
	Inject,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { USERS_REPOSITORY } from '../tokens/users.token';
import type { IUsersRepository } from '../contracts/users.repository';
import { GetUserLiteDto } from 'src/common/dtos/users/getUserLite.dto';
import { UserRegistrationData } from 'src/common/interfaces/authentication/userRegistrationData.interface';
import { toGetUserLiteDto } from '../mappers/users.mappers';
import { CredentialProvider } from 'src/common/types/enums';
import {
	UserCredentialLocalData,
	UserCredentialOAuthData,
} from 'src/common/interfaces/user/userCredentialData.interface';
import { CreateSessionData } from 'src/common/interfaces/authentication/createSessionData.interface';
import { env } from 'src/env';
import { UpdateSessionData } from 'src/common/interfaces/authentication/updateSessionData.interface';
import { toStringHash } from 'src/features/authentication/utilities/stringTransform';
import { UserSessionPayload } from '../utilities/users.selects';

@Injectable()
export class UsersService {
	constructor(
		@Inject(USERS_REPOSITORY)
		private readonly usersRepository: IUsersRepository,
	) {}

	async doesUserExist(email: string): Promise<boolean> {
		const user = await this.usersRepository.getUser(email);
		return !!user;
	}

	async getUserCredential(
		provider: typeof CredentialProvider.LOCAL,
		email: string,
	): Promise<UserCredentialLocalData | null>;
	async getUserCredential(
		provider:
			typeof CredentialProvider.GOOGLE | typeof CredentialProvider.GITHUB,
		email: string,
	): Promise<UserCredentialOAuthData | null>;
	async getUserCredential(
		provider: CredentialProvider,
		email: string,
	): Promise<UserCredentialLocalData | UserCredentialOAuthData | null> {
		const userCredentials = await this.usersRepository.getUserCredential(
			provider,
			email,
		);

		return userCredentials;
	}

	async getUser(email: string): Promise<GetUserLiteDto> {
		const user = await this.usersRepository.getUser(email);

		if (!user) {
			throw new NotFoundException(`User with email ${email} not found`);
		}

		return toGetUserLiteDto(user);
	}

	async getUserById(id: string): Promise<GetUserLiteDto> {
		const user = await this.usersRepository.getUserById(id);

		if (!user) {
			throw new NotFoundException(`User not found`);
		}

		return toGetUserLiteDto(user);
	}

	async registerUser(data: UserRegistrationData): Promise<GetUserLiteDto> {
		const user = await this.usersRepository.registerUser(data);
		return toGetUserLiteDto(user);
	}

	async getSession(sessionId: string): Promise<UserSessionPayload> {
		const session = await this.usersRepository.getSession(sessionId);

		if (!session) {
			throw new UnauthorizedException('Invalid session, please reauthenticate');
		}

		return session;
	}

	async createSession(userId: string): Promise<UserSessionPayload> {
		const payload: CreateSessionData = {
			userId,
		};
		return this.usersRepository.createSession(payload);
	}

	async updateSession(
		sessionId: string,
		refreshToken: string,
		expiresAt?: Date,
	): Promise<UserSessionPayload> {
		const refreshTokenHash = await toStringHash(refreshToken);
		const payload: UpdateSessionData = {
			sessionId,
			refreshTokenHash,
			expiresAt:
				expiresAt ??
				new Date(Date.now() + env.JWT_REFRESH_TOKEN_EXPIRATION * 1000),
		};

		return this.usersRepository.updateSession(payload);
	}

	logoutUser(sessionId: string): Promise<void> {
		return this.usersRepository.logoutUser(sessionId);
	}
}
