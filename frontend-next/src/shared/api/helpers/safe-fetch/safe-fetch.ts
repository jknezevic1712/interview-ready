import 'server-only';

import { cookies } from 'next/headers';
import { NormalizedPayload } from '@/common/interfaces/api/normalized-payload.model';
import {
	type ClientSafeData,
	getErrorMessage,
	type OrvalResponse,
	persistAuthTokens,
	removeAuthTokens,
} from './helpers';

export async function safeFetch<T extends OrvalResponse<unknown>>(
	url: string,
	options?: RequestInit,
): Promise<NormalizedPayload<ClientSafeData<T['data']>>> {
	const cookieStore = await cookies();

	const accessToken = cookieStore.get('access_token')?.value;
	const refreshToken = cookieStore.get('refresh_token')?.value;

	const headers = new Headers(options?.headers);

	if (accessToken) {
		headers.set('Authorization', `Bearer ${accessToken}`);
	}

	if (refreshToken) {
		headers.set('Cookie', `refresh_token=${refreshToken}`);
	}

	const response = await fetch(url, {
		...options,
		headers,
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

	await persistAuthTokens(body);

	return {
		data: removeAuthTokens(body) as ClientSafeData<T['data']>,
		error: null,
	};
}
