import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUsersRepository } from '../contracts/users.repository';
import {
	userCredentialSelect,
	UserLitePayload,
	userLiteSelect,
	UserPayload,
	userSelect,
	UserSessionPayload,
	userSessionSelect,
} from '../utilities/users.selects';
import { UserRegistrationData } from 'src/common/interfaces/authentication/userRegistrationData.interface';
import { CredentialProvider } from 'src/common/types/enums';
import {
	UserCredentialLocalData,
	UserCredentialOAuthData,
} from 'src/common/interfaces/user/userCredentialData.interface';
import { env } from 'src/env';
import { CreateSessionData } from 'src/common/interfaces/authentication/createSessionData.interface';
import { UpdateSessionData } from 'src/common/interfaces/authentication/updateSessionData.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
	constructor(private readonly db: PrismaService) {}

	getUser(email: string): Promise<UserLitePayload | null> {
		return this.db.user.findUnique({
			where: {
				email,
			},
			select: userLiteSelect,
		});
	}

	getUserWithSession(
		userId: string,
		sessionId: string,
	): Promise<UserPayload | null> {
		return this.db.user.findUnique({
			where: {
				id: userId,
			},
			select: userSelect(sessionId),
		});
	}

	getUserCredential(
		provider: typeof CredentialProvider.LOCAL,
		email: string,
	): Promise<UserCredentialLocalData | null>;
	getUserCredential(
		provider:
			typeof CredentialProvider.GOOGLE | typeof CredentialProvider.GITHUB,
		email: string,
	): Promise<UserCredentialOAuthData | null>;
	getUserCredential(
		provider: CredentialProvider,
		email: string,
	): Promise<UserCredentialLocalData | UserCredentialOAuthData | null> {
		return this.db.userCredential.findFirst({
			where: {
				provider,
				user: {
					email,
				},
			},
			select: userCredentialSelect(provider),
		});
	}

	registerUser(data: UserRegistrationData): Promise<UserLitePayload> {
		return this.db.user.create({
			data: {
				email: data.email,
				name: data.name,
				userCredentials: {
					create: {
						provider: CredentialProvider.LOCAL,
						passwordHash: data.passwordHash,
					},
				},
			},
			select: userLiteSelect,
		});
	}

	getSession(sessionId: string): Promise<UserSessionPayload | null> {
		return this.db.userSession.findUnique({
			where: {
				id: sessionId,
			},
			select: userSessionSelect,
		});
	}

	createSession(data: CreateSessionData): Promise<UserSessionPayload> {
		return this.db.userSession.create({
			data: {
				userId: data.userId,
				refreshTokenHash: null,
				expiresAt: new Date(
					Date.now() + env.JWT_REFRESH_TOKEN_EXPIRATION * 1000,
				),
			},
			select: userSessionSelect,
		});
	}

	updateSession(data: UpdateSessionData): Promise<UserSessionPayload> {
		return this.db.userSession.update({
			where: {
				id: data.sessionId,
			},
			data: {
				refreshTokenHash: data.refreshTokenHash,
				expiresAt: data.expiresAt,
				updatedAt: new Date(Date.now()),
			},
		});
	}

	async logoutUser(sessionId: string): Promise<void> {
		await this.db.userSession.delete({
			where: {
				id: sessionId,
			},
		});
	}
}
