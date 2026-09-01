import { days, minutes } from '@nestjs/throttler';

export const CACHE_KEYS = {
	categories: {
		all: 'categories:all',
	},
	questions: {
		bySession: (sessionId: string) => `questions:session:${sessionId}`,
	},
	quizSessions: {
		allByUserId: (userId: string) => `quizSessions:userId:${userId}`,
	},
} as const;

export const CACHE_TTL = {
	categories: {
		getAll: days(1),
	},
	questions: {
		bySession: minutes(1),
	},
	quizSessions: {
		allByUserId: minutes(30),
	},
} as const;
