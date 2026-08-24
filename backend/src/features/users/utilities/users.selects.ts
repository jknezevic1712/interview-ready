import { Prisma } from 'src/common/types/client';
import { CredentialProvider } from 'src/common/types/enums';

export const userSelect = {
	id: true,
	name: true,
	email: true,
	role: true,
} satisfies Prisma.UserSelect;
export type UserPayload = Prisma.UserGetPayload<{ select: typeof userSelect }>;

export const userCredentialSelect = (provider: CredentialProvider) => {
	function getSelectQuery(): Pick<
		Prisma.UserCredentialSelect,
		'passwordHash' | 'providerUserId'
	> {
		switch (provider) {
			case CredentialProvider.LOCAL:
				return { passwordHash: true };

			case CredentialProvider.GOOGLE:
			case CredentialProvider.GITHUB:
				return { providerUserId: true };

			default:
				return {};
		}
	}

	return getSelectQuery() satisfies Prisma.UserCredentialSelect;
};
