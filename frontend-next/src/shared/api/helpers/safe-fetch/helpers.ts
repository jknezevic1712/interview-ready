import 'server-only';

import { cookies } from 'next/headers';

export type OrvalResponse<T> = {
	data: T;
	status: number;
	headers: Headers;
};

type AuthTokenPayload = {
	accessToken?: string;
	refreshToken?: string;
};

export type ClientSafeData<T> = T extends readonly unknown[]
	? T
	: T extends object
		? Omit<T, keyof AuthTokenPayload>
		: T;

export async function persistAuthTokens(body: unknown): Promise<void> {
	if (!isAuthTokenPayload(body)) {
		return;
	}

	const cookieStore = await cookies();

	if (body.accessToken) {
		cookieStore.set('access_token', body.accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
		});
	}

	if (body.refreshToken) {
		cookieStore.set('refresh_token', body.refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
		});
	}
}

export function removeAuthTokens(body: unknown): unknown {
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

function isAuthTokenPayload(body: unknown): body is AuthTokenPayload {
	return (
		body !== null &&
		typeof body === 'object' &&
		!Array.isArray(body) &&
		('accessToken' in body || 'refreshToken' in body)
	);
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
