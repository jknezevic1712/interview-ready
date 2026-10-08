import { healthControllerCheck } from '@/common/generated/api';

export async function apiHealthCheck() {
	const response = await healthControllerCheck({
		prohibitAuthCookieMutation: true,
	});
	return response;
}
