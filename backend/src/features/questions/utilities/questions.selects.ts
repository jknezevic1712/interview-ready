import { Prisma } from 'src/common/types/client';

export const questionsSelect = {
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
export type QuestionsPayload = Prisma.QuestionGetPayload<{
	select: typeof questionsSelect;
}>;
