'use server';

import {
	authenticationControllerGetUser,
	authenticationControllerLoginViaEmailAndPassword,
	authenticationControllerLogout,
	authenticationControllerRegisterViaEmailAndPassword,
} from '@/common/generated/api';
import { CreateUserRequest, LoginUserRequest } from '@/common/generated/models';
import { clearAuthCookies, setAuthCookies } from '../helpers/cookies';
import { refreshAuthTokensDeduped } from '../helpers/safe-fetch/refresh-token-helper';

export async function getUser() {
	const response = await authenticationControllerGetUser({
		prohibitAuthCookieMutation: true,
	});
	return response;
}

export async function loginUserViaEmailAndPassword(request: LoginUserRequest) {
	const response =
		await authenticationControllerLoginViaEmailAndPassword(request);
	return response;
}

export async function registerUserViaEmailAndPassword(
	request: CreateUserRequest,
) {
	const response =
		await authenticationControllerRegisterViaEmailAndPassword(request);
	return response;
}

export async function logoutUser() {
	const response = await authenticationControllerLogout({
		prohibitAuthCookieMutation: true,
	});

	if (!response.error) {
		await clearAuthCookies();
	}

	return response;
}

export async function refreshUserToken() {
	const response = await refreshAuthTokensDeduped();

	if (!response.success) {
		if (response.clearCookies) {
			await clearAuthCookies();
		}

		return {
			error: 'Token refresh failed',
		};
	}

	await setAuthCookies(response.tokens);

	return {
		error: null,
	};
}
