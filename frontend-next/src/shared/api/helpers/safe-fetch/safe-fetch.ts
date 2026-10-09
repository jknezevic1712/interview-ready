import 'server-only';

import { cookies } from 'next/headers';
import { NormalizedPayload } from '@/common/interfaces/api/normalized-payload.model';
import { clearAuthCookies, setAuthCookies } from '../cookies';
import {
	type ClientSafeData,
	getErrorMessage,
	type OrvalResponse,
	SafeFetchOptions,
	stripAuthTokens,
} from './helpers';
import { refreshAuthTokensDeduped } from './refresh-token-helper';

export async function safeFetch<T extends OrvalResponse<unknown>>(
	url: string,
	options?: SafeFetchOptions,
): Promise<NormalizedPayload<ClientSafeData<T['data']>>> {
	const response = await fetchWithAuth(url, options);

	if (response.status === 401 && shouldRefreshToken(url)) {
		if (options?.prohibitAuthCookieMutation) {
			return normalizeResponse<T['data']>(response, false);
		}

		const refreshResult = await refreshAuthTokensDeduped();

		if (refreshResult.success) {
			await setAuthCookies(refreshResult.tokens);

			const retryResponse = await fetchWithAuth(url, options);

			return normalizeResponse<T['data']>(retryResponse, true);
		}

		if (refreshResult.clearCookies) {
			await clearAuthCookies();
		}
	}

	return normalizeResponse<T['data']>(
		response,
		!!options?.prohibitAuthCookieMutation,
	);
}

async function fetchWithAuth(
	url: string,
	options?: SafeFetchOptions,
): Promise<Response> {
	const {
		prohibitAuthCookieMutation: _prohibitAuthCookieMutation,
		...requestOptions
	} = options ?? {};

	const cookieStore = await cookies();

	const accessToken = cookieStore.get('access_token')?.value;
	const refreshToken = cookieStore.get('refresh_token')?.value;

	const headers = new Headers(requestOptions.headers);

	if (accessToken) {
		headers.set('Authorization', `Bearer ${accessToken}`);
	}

	// Only send the refresh token where Nest actually needs it.
	if (refreshToken && shouldSendRefreshToken(url)) {
		headers.set('Cookie', `refresh_token=${refreshToken}`);
	}

	return fetch(url, {
		...requestOptions,
		headers,
		cache: 'no-store',
	});
}

async function normalizeResponse<T>(
	response: Response,
	prohibitAuthCookieMutation: boolean,
): Promise<NormalizedPayload<ClientSafeData<T>>> {
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
			statusCode: response.status,
		};
	}

	if (!prohibitAuthCookieMutation) {
		await setAuthCookies(body);
	}

	return {
		data: stripAuthTokens(body) as ClientSafeData<T>,
		error: null,
		statusCode: response.status,
	};
}

function shouldRefreshToken(url: string): boolean {
	const pathname = new URL(url).pathname;

	return !isAuthenticationEndpoint(pathname);
}

function isAuthenticationEndpoint(pathname: string): boolean {
	const authenticationEndpoints = [
		'/authentication/login',
		'/authentication/register',
		'/authentication/refresh',
		'/authentication/logout',
	];

	return authenticationEndpoints.some((endpoint) =>
		pathname.endsWith(endpoint),
	);
}

function shouldSendRefreshToken(url: string): boolean {
	const pathname = new URL(url).pathname;

	return (
		pathname.endsWith('/authentication/user') ||
		pathname.endsWith('/authentication/refresh') ||
		pathname.endsWith('/authentication/logout')
	);
}
