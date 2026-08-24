import bcrypt from 'bcrypt';

export const toStringHash = (input: string) => {
	const SALT_ROUNDS = 14;

	const salt = bcrypt.genSaltSync(SALT_ROUNDS);
	const inputHash = bcrypt.hashSync(input, salt);
	return inputHash;
};

export const compareStringHashes = (input: string, inputHash: string) => {
	return bcrypt.compareSync(input, inputHash);
};
