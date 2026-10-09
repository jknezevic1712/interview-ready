import { LoginFormData } from './login-form-data';

export interface RegistrationFormData extends LoginFormData {
	name: string;
}
