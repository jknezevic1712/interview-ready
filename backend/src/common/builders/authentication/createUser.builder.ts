import type { CreateUserDto } from 'src/common/dtos/authentication/createUser.dto';

class CreateUserBuilder implements CreateUserDto {
	email = 'test@test.com';
	name = 'Test user 1';
	password = '12345678';

	withEmail(email: CreateUserDto['email']) {
		this.email = email;
		return this;
	}

	withName(name: CreateUserDto['name']) {
		this.name = name;
		return this;
	}

	withPassword(password: CreateUserDto['password']) {
		this.password = password;
		return this;
	}

	build(): CreateUserDto {
		return {
			email: this.email,
			name: this.name,
			password: this.password,
		};
	}
}

export const buildCreateUser = new CreateUserBuilder();
