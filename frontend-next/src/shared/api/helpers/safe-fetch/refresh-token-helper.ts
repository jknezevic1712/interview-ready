import 'server-only';

import { cookies } from 'next/headers';
import { type AuthTokenPayload, isAuthTokenPayload } from '../cookies';
import { getRefreshTokenFromResponse } from './helpers';

type RefreshTokenResult =
	| {
			success: true;
			tokens: Required<AuthTokenPayload>;
	  }
	| {
			success: false;
			clearCookies: boolean;
	  };

const activeRefreshes = new Map<string, Promise<RefreshTokenResult>>();

export async function refreshAuthTokensDeduped(): Promise<RefreshTokenResult> {
	const cookieStore = await cookies();
	const refreshToken = cookieStore.get('refresh_token')?.value;

	if (!refreshToken) {
		return {
			success: false,
			clearCookies: false,
		};
	}

	const activeRefresh = activeRefreshes.get(refreshToken);

	if (activeRefresh) {
		return activeRefresh;
	}

	const refreshPromise = refreshAuthTokens(refreshToken);

	activeRefreshes.set(refreshToken, refreshPromise);

	try {
		return await refreshPromise;
	} finally {
		activeRefreshes.delete(refreshToken);
	}
}

async function refreshAuthTokens(
	refreshToken: string,
): Promise<RefreshTokenResult> {
	const response = await fetch(
		`${process.env.API_URL}/authentication/refresh`,
		{
			method: 'POST',
			headers: {
				Cookie: `refresh_token=${refreshToken}`,
			},
			cache: 'no-store',
		},
	);

	if (!response.ok) {
		return {
			success: false,
			clearCookies: response.status === 401,
		};
	}

	const body: unknown = await response.json();

	if (!isAuthTokenPayload(body) || !body.accessToken) {
		return {
			success: false,
			clearCookies: true,
		};
	}

	const newRefreshToken = getRefreshTokenFromResponse(response);

	if (!newRefreshToken) {
		return {
			success: false,
			clearCookies: true,
		};
	}

	return {
		success: true,
		tokens: {
			accessToken: body.accessToken,
			refreshToken: newRefreshToken,
		},
	};
}
