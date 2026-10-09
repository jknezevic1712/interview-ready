import { LoginUserRequest } from '@/common/generated/models';
import { LoginFormData } from '../interfaces/login-form-data';

export function toLoginUserRequestDTO(data: LoginFormData): LoginUserRequest {
	return {
		email: data.email,
		password: data.password,
	};
}
