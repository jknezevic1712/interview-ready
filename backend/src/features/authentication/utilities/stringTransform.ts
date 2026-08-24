import bcrypt from 'bcrypt';

const SALT_ROUNDS = 14 as const;

export const toStringHash = (input: string) => {
	return bcrypt.hash(input, SALT_ROUNDS);
};

export const compareStringHashes = (input: string, inputHash: string) => {
	return bcrypt.compare(input, inputHash);
};
