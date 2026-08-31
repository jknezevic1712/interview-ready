import type { LoginUserRequest } from 'src/common/dtos/authentication/loginUserRequest.dto';

class LoginUserRequestBuilder implements LoginUserRequest {
	email = 'test@test.com';
	password = '12345678';

	withEmail(email: LoginUserRequest['email']) {
		this.email = email;
		return this;
	}

	withPassword(password: LoginUserRequest['password']) {
		this.password = password;
		return this;
	}

	build(): LoginUserRequest {
		return {
			email: this.email,
			password: this.password,
		};
	}
}

export const buildLoginUserRequest = () => new LoginUserRequestBuilder();
