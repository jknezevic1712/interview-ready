import { Role } from 'src/common/types/enums';

import type { GetUserLiteDto } from 'src/common/dtos/users/getUserLite.dto';

export class GetUserLiteBuilder implements GetUserLiteDto {
	id = 'user-1';
	email = 'test@test.com';
	name = 'Test user 1';
	role: Role = Role.USER;

	withId(id: GetUserLiteDto['id']) {
		this.id = id;
		return this;
	}

	withEmail(email: GetUserLiteDto['email']) {
		this.email = email;
		return this;
	}

	withName(name: GetUserLiteDto['name']) {
		this.name = name;
		return this;
	}

	withRole(role: GetUserLiteDto['role']) {
		this.role = role;
		return this;
	}

	build(): GetUserLiteDto {
		return {
			id: this.id,
			email: this.email,
			name: this.name,
			role: this.role,
		};
	}
}

export const buildGetUserLite = () => new GetUserLiteBuilder();
