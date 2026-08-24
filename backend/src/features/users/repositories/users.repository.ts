import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUsersRepository } from '../contracts/users.repository';
import { UserPayload, userSelect } from '../utilities/users.selects';
import { UserRegistrationData } from 'src/common/interfaces/authentication/userRegistrationData.interface';
import { CredentialProvider } from 'src/common/types/enums';

@Injectable()
export class UsersRepository implements IUsersRepository {
	constructor(private readonly db: PrismaService) {}

	getUser(email: string) {
		return this.db.user.findUnique({
			where: {
				email,
			},
			select: userSelect,
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
