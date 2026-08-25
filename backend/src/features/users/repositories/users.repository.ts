import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUsersRepository } from '../contracts/users.repository';
import {
	userCredentialSelect,
	UserPayload,
	userSelect,
} from '../utilities/users.selects';
import { UserRegistrationData } from 'src/common/interfaces/authentication/userRegistrationData.interface';
import { CredentialProvider } from 'src/common/types/enums';
import {
	UserCredentialLocalData,
	UserCredentialOAuthData,
} from 'src/common/interfaces/user/userCredentialData.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
	constructor(private readonly db: PrismaService) {}

	getUser(email: string): Promise<UserPayload | null> {
		return this.db.user.findUnique({
			where: {
				email,
			},
			select: userSelect,
		});
	}

	getUserById(id: string): Promise<UserPayload | null> {
		return this.db.user.findUnique({
			where: {
				id,
			},
			select: userSelect,
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

	registerUser(data: UserRegistrationData): Promise<UserPayload> {
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
			select: userSelect,
		});
	}
}
