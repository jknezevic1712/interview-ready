import 'server-only';

import { cookies } from 'next/headers';

export type AuthTokenPayload = {
	accessToken?: string;
	refreshToken?: string;
};

const AUTH_COOKIE_OPTIONS = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'lax' as const,
	path: '/',
};

export function isAuthTokenPayload(body: unknown): body is AuthTokenPayload {
	return (
		body !== null &&
		typeof body === 'object' &&
		!Array.isArray(body) &&
		('accessToken' in body || 'refreshToken' in body)
	);
}

export async function clearAuthCookies(): Promise<void> {
	const cookieStore = await cookies();

	cookieStore.delete('access_token');
	cookieStore.delete('refresh_token');
}

export async function setAuthCookies(body: unknown): Promise<void> {
	if (!isAuthTokenPayload(body)) {
		return;
	}

	const cookieStore = await cookies();

	if (body.accessToken) {
		cookieStore.set('access_token', body.accessToken, AUTH_COOKIE_OPTIONS);
	}

	if (body.refreshToken) {
		cookieStore.set('refresh_token', body.refreshToken, AUTH_COOKIE_OPTIONS);
	}
}
