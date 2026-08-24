import { Prisma } from 'src/common/types/client';

export const userSelect = {
	id: true,
	name: true,
	email: true,
	role: true,
} satisfies Prisma.UserSelect;
export type UserPayload = Prisma.UserGetPayload<{ select: typeof userSelect }>;
