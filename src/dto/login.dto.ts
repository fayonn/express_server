import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
	@IsEmail({}, { message: 'Wrong email' })
	email: string;

	@IsString()
	password: string;

	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}
}
