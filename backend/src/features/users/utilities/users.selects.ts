import { Prisma } from 'src/common/types/client';
import { CredentialProvider } from 'src/common/types/enums';

export const userLiteSelect = {
	id: true,
	name: true,
	email: true,
	role: true,
} satisfies Prisma.UserSelect;
export type UserLitePayload = Prisma.UserGetPayload<{
	select: typeof userLiteSelect;
}>;

export const userSelect = (sessionId: string) =>
	({
		id: true,
		name: true,
		email: true,
		role: true,
		userSessions: {
			where: {
				id: sessionId,
			},
			select: {
				id: true,
			},
		},
	}) satisfies Prisma.UserSelect;
export type UserPayload = Prisma.UserGetPayload<{
	select: ReturnType<typeof userSelect>;
}>;

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

export const userSessionSelect = {
	id: true,
} satisfies Prisma.UserSessionSelect;
export type UserSessionPayload = Prisma.UserSessionGetPayload<{
	select: typeof userSessionSelect;
}>;
