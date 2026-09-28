export interface NormalizedPayload<T> {
	data: T | null;
	error: string | null;
}
