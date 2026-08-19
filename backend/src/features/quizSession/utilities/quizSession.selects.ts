import { Prisma } from 'src/common/types/client';

export const quizSessionLiteSelect = {
	id: true,
	status: true,
	startedAt: true,
	completedAt: true,
	user: {
		select: {
			id: true,
			name: true,
		},
	},
} satisfies Prisma.QuizSessionSelect;

export type QuizSessionLitePayload = Prisma.QuizSessionGetPayload<{
	select: typeof quizSessionLiteSelect;
}>;

export const quizSessionSelect = {
	id: true,
	status: true,
	startedAt: true,
	completedAt: true,
	user: {
		select: {
			id: true,
			name: true,
		},
	},
	responses: {
		select: {
			id: true,
			textAnswer: true,
			answeredAt: true,
			feedback: true,
			isCorrect: true,
			score: true,
			question: {
				select: {
					id: true,
					text: true,
					explanation: true,
					type: true,
					difficulty: true,
					aiGenerated: true,
					createdAt: true,
					updatedAt: true,
					category: {
						select: {
							id: true,
							name: true,
							slug: true,
						},
					},
					answerOptions: {
						select: {
							id: true,
							isCorrect: true,
							text: true,
						},
					},
				},
			},
			answers: {
				select: {
					answerOptionId: true,
				},
			},
		},
	},
} satisfies Prisma.QuizSessionSelect;

export type QuizSessionPayload = Prisma.QuizSessionGetPayload<{
	select: typeof quizSessionSelect;
}>;
