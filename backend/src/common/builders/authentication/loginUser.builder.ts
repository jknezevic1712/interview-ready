import type { LoginUserDto } from 'src/common/dtos/authentication/loginUser.dto';

class LoginUserBuilder implements LoginUserDto {
	email = 'test@test.com';
	password = '12345678';

	withEmail(email: LoginUserDto['email']) {
		this.email = email;
		return this;
	}

	withPassword(password: LoginUserDto['password']) {
		this.password = password;
		return this;
	}

	build(): LoginUserDto {
		return {
			email: this.email,
			password: this.password,
		};
	}
}

export const buildLoginUser = new LoginUserBuilder();
