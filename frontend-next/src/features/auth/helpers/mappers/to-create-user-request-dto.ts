import { CreateUserRequest } from '@/common/generated/models';
import { RegistrationFormData } from '../interfaces/registration-form-data';

export function toCreateUserRequestDTO(
	data: RegistrationFormData,
): CreateUserRequest {
	return {
		email: data.email,
		name: data.name,
		password: data.password,
	};
}
