import { createHash } from 'node:crypto';
import bcrypt from 'bcrypt';
import { env } from 'src/env';

const normalizeInput = (input: string) =>
	createHash('sha256').update(input).digest('hex');

export const toStringHash = (input: string) => {
	return bcrypt.hash(normalizeInput(input), env.BCRYPT_SALT_ROUNDS);
};

export const compareStringHashes = (input: string, inputHash: string) => {
	return bcrypt.compare(normalizeInput(input), inputHash);
};
