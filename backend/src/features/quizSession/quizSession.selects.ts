import { Prisma } from 'src/common/types/client';

export const quizSessionWithUserSelect = {
	id: true,
	status: true,
	responses: true,
	startedAt: true,
	completedAt: true,
	user: {
		select: {
			id: true,
			name: true,
		},
	},
} satisfies Prisma.QuizSessionSelect;
