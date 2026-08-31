import type { LoginUser } from 'src/common/dtos/authentication/loginUser.dto';

class LoginUserBuilder implements LoginUser {
	email = 'test@test.com';
	password = '12345678';

	withEmail(email: LoginUser['email']) {
		this.email = email;
		return this;
	}

	withPassword(password: LoginUser['password']) {
		this.password = password;
		return this;
	}

	build(): LoginUser {
		return {
			email: this.email,
			password: this.password,
		};
	}
}

export const buildLoginUser = () => new LoginUserBuilder();
