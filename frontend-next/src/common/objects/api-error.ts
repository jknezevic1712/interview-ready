export class ApiError extends Error {
	constructor(
		public readonly status: number,
		public readonly code?: string,
		public readonly details?: unknown,
		message = 'Something went wrong',
	) {
		super(message);
		this.name = 'Error caught';
	}
}
