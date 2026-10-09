import { NormalizedPayload } from '@/common/interfaces/api/normalized-payload.model';

type OrvalResponse<T> = {
	data: T;
	status: number;
	headers: Headers;
};

export async function safeFetch<T extends OrvalResponse<unknown>>(
	url: string,
	options?: RequestInit,
): Promise<NormalizedPayload<T['data']>> {
	const response = await fetch(url, {
		...options,
		credentials: 'include',
	});

	const contentType = response.headers.get('content-type');

	const body =
		response.status === 204
			? null
			: contentType?.includes('application/json')
				? await response.json()
				: await response.text();

	if (!response.ok) {
		return {
			data: null,
			error: getErrorMessage(body),
		};
	}

	return {
		data: body,
		error: null,
	};
}

function getErrorMessage(body: unknown): string {
	if (typeof body === 'string') {
		return body;
	}

	if (body && typeof body === 'object' && 'message' in body) {
		const message = body.message;

		if (typeof message === 'string') {
			return message;
		}

		if (Array.isArray(message)) {
			return message.join(', ');
		}
	}

	return 'Something went wrong';
}
