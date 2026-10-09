import { healthControllerCheck } from '@/common/generated/api';

export async function apiHealthCheck() {
	const response = await healthControllerCheck();
	return response;
}
