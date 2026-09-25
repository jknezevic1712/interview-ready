'use server';

import {
	authenticationControllerGetUser,
	authenticationControllerLoginViaEmailAndPassword,
	authenticationControllerRegisterViaEmailAndPassword,
} from '@/common/generated/api';
import { CreateUserRequest, LoginUserRequest } from '@/common/generated/models';

export async function getUser() {
	const response = await authenticationControllerGetUser();
	return response.data;
}

export async function authenticateViaEmailAndPassword(
	request: LoginUserRequest,
) {
	const response =
		await authenticationControllerLoginViaEmailAndPassword(request);
	return response.data;
}

export async function registerViaEmailAndPassword(request: CreateUserRequest) {
	const response =
		await authenticationControllerRegisterViaEmailAndPassword(request);
	return response.data;
}
