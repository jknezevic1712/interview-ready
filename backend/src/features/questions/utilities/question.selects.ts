import { Prisma } from 'src/common/types/client';

export const questionSelect = {
	id: true,
	text: true,
	explanation: true,
	type: true,
	difficulty: true,
	aiGenerated: true,
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
			text: true,
			isCorrect: true,
		},
	},
} satisfies Prisma.QuestionSelect;
export type QuestionPayload = Prisma.QuestionGetPayload<{
	select: typeof questionSelect;
}>;
