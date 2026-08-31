import { days } from '@nestjs/throttler';

export const CACHE_KEYS = {
	categories: {
		getAll: 'categories:all',
	},
} as const;

export const CACHE_TTL = {
	categories: {
		getAll: days(1),
	},
} as const;
