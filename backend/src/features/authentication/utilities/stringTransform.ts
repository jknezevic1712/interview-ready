import { createHash } from 'node:crypto';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 14 as const;

const normalizeInput = (input: string) =>
	createHash('sha256').update(input).digest('hex');

export const toStringHash = (input: string) => {
	return bcrypt.hash(normalizeInput(input), SALT_ROUNDS);
};

export const compareStringHashes = (input: string, inputHash: string) => {
	return bcrypt.compare(normalizeInput(input), inputHash);
};
