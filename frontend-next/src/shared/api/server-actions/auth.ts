'use server';

import {
	authenticationControllerGetUser,
	authenticationControllerLoginViaEmailAndPassword,
	authenticationControllerLogout,
	authenticationControllerRefreshAccessToken,
	authenticationControllerRegisterViaEmailAndPassword,
} from '@/common/generated/api';
import { CreateUserRequest, LoginUserRequest } from '@/common/generated/models';
import { clearAuthCookies } from './helpers/helpers';

export async function getUser() {
	const response = await authenticationControllerGetUser();
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
	const response = await authenticationControllerLogout();

	if (!response.error) {
		await clearAuthCookies();
	}

	return response;
}

export async function refreshUserToken() {
	const response = await authenticationControllerRefreshAccessToken();
	return response;
}
