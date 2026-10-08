import 'server-only';

import { type AuthTokenPayload, isAuthTokenPayload } from '../cookies';

export type OrvalResponse<T> = {
	data: T;
	status: number;
	headers: Headers;
};

export type SafeFetchOptions = RequestInit & {
	prohibitAuthCookieMutation?: boolean;
};

export type ClientSafeData<T> = T extends readonly unknown[]
	? T
	: T extends object
		? Omit<T, keyof AuthTokenPayload>
		: T;

export function stripAuthTokens(body: unknown): unknown {
	if (!isAuthTokenPayload(body)) {
		return body;
	}

	const {
		accessToken: _accessToken,
		refreshToken: _refreshToken,
		...safeBody
	} = body;

	return safeBody;
}

export function getErrorMessage(body: unknown): string {
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

export function getRefreshTokenFromResponse(response: Response): string | null {
	const setCookies = response.headers.getSetCookie();

	const refreshCookie = setCookies.find((cookie) =>
		cookie.startsWith('refresh_token='),
	);

	if (!refreshCookie) {
		return null;
	}

	const cookieValue = refreshCookie.split(';', 1)[0];
	const [, refreshToken] = cookieValue.split('=');

	return refreshToken ? decodeURIComponent(refreshToken) : null;
}
