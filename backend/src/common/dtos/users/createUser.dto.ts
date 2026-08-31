import {
	IsEmail,
	IsNotEmpty,
	IsString,
	IsStrongPassword,
} from 'class-validator';

export class CreateUser {
	@IsEmail()
	email!: string;

	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsStrongPassword()
	password!: string;
}
