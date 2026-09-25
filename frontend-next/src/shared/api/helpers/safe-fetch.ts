import { ApiError } from '@/common/objects/api-error';

export async function safeFetch<T>(
	url: string,
	options?: RequestInit,
): Promise<T> {
	const response = await fetch(url, {
		...options,
		credentials: 'include',
	});

	const contentType = response.headers.get('content-type');

	const body =
		response.status === 204
			? undefined
			: contentType?.includes('application/json')
				? await response.json()
				: await response.text();

	if (!response.ok) {
		throw new ApiError(
			response.status,
			typeof body === 'object' && body !== null ? body.code : undefined,
			body,
			typeof body === 'object' &&
				body !== null &&
				'message' in body &&
				typeof body.message === 'string'
				? body.message
				: `Request failed with status ${response.status}`,
		);
	}

	return body as T;
}
