import type { CreateUser } from 'src/common/dtos/users/createUser.dto';

class CreateUserBuilder implements CreateUser {
	email = 'test@test.com';
	name = 'Test user 1';
	password = '12345678';

	withEmail(email: CreateUser['email']) {
		this.email = email;
		return this;
	}

	withName(name: CreateUser['name']) {
		this.name = name;
		return this;
	}

	withPassword(password: CreateUser['password']) {
		this.password = password;
		return this;
	}

	build(): CreateUser {
		return {
			email: this.email,
			name: this.name,
			password: this.password,
		};
	}
}

export const buildCreateUser = () => new CreateUserBuilder();
