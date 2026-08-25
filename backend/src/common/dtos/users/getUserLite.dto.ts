import { User } from 'src/common/types/client';

export class GetUserLiteDto {
	id!: User['id'];
	email!: User['email'];
	name!: User['name'];
	role!: User['role'];
}
