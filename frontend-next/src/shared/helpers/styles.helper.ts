import { type ClassValue, cn } from 'cn';

export function concatenateClassnames(
	...inputs: (
		| string
		| number
		| bigint
		| boolean
		| ClassValue[]
		| {
				[id: string]: any;
		  }
		| null
		| undefined
	)[]
): string {
	return cn(inputs);
}
