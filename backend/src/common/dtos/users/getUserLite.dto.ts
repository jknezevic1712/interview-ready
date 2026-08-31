import { User } from 'src/common/types/client';

export class GetUserLite {
	id!: User['id'];
	email!: User['email'];
	name!: User['name'];
	role!: User['role'];
}
