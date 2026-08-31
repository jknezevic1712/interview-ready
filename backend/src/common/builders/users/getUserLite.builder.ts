import { Role } from 'src/common/types/enums';

import type { GetUserLite } from 'src/common/dtos/users/getUserLite.dto';

export class GetUserLiteBuilder implements GetUserLite {
	id = 'user-1';
	email = 'test@test.com';
	name = 'Test user 1';
	role: Role = Role.USER;

	withId(id: GetUserLite['id']) {
		this.id = id;
		return this;
	}

	withEmail(email: GetUserLite['email']) {
		this.email = email;
		return this;
	}

	withName(name: GetUserLite['name']) {
		this.name = name;
		return this;
	}

	withRole(role: GetUserLite['role']) {
		this.role = role;
		return this;
	}

	build(): GetUserLite {
		return {
			id: this.id,
			email: this.email,
			name: this.name,
			role: this.role,
		};
	}
}

export const buildGetUserLite = () => new GetUserLiteBuilder();
