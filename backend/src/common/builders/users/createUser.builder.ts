import type { CreateUserRequest } from 'src/common/dtos/users/createUserRequest.dto';

class CreateUserBuilder implements CreateUserRequest {
	email = 'test@test.com';
	name = 'Test user 1';
	password = '12345678';

	withEmail(email: CreateUserRequest['email']) {
		this.email = email;
		return this;
	}

	withName(name: CreateUserRequest['name']) {
		this.name = name;
		return this;
	}

	withPassword(password: CreateUserRequest['password']) {
		this.password = password;
		return this;
	}

	build(): CreateUserRequest {
		return {
			email: this.email,
			name: this.name,
			password: this.password,
		};
	}
}

export const buildCreateUser = () => new CreateUserBuilder();
