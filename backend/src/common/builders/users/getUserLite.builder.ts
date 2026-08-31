import { Role } from 'src/common/types/enums';

import type { GetUserLiteResponse } from 'src/common/dtos/users/getUserLiteResponse.dto';

export class GetUserLiteBuilder implements GetUserLiteResponse {
	id = 'user-1';
	email = 'test@test.com';
	name = 'Test user 1';
	role: Role = Role.USER;

	withId(id: GetUserLiteResponse['id']) {
		this.id = id;
		return this;
	}

	withEmail(email: GetUserLiteResponse['email']) {
		this.email = email;
		return this;
	}

	withName(name: GetUserLiteResponse['name']) {
		this.name = name;
		return this;
	}

	withRole(role: GetUserLiteResponse['role']) {
		this.role = role;
		return this;
	}

	build(): GetUserLiteResponse {
		return {
			id: this.id,
			email: this.email,
			name: this.name,
			role: this.role,
		};
	}
}

export const buildGetUserLite = () => new GetUserLiteBuilder();
