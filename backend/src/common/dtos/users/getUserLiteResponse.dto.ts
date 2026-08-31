import { User } from 'src/common/types/client';

export class GetUserLiteResponse {
	id!: User['id'];
	email!: User['email'];
	name!: User['name'];
	role!: User['role'];
}
