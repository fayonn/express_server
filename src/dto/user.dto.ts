import { IsEmail, IsString, IsNumber } from 'class-validator';

export class UserDto {
	@IsNumber() id: number;

	@IsEmail({}, { message: 'Wrong email' })
	email: string;

	@IsString() password: string;
	@IsString() name: string;

	constructor(id: number, email: string, password: string, name: string) {
		this.id = id;
		this.email = email;
		this.password = password;
		this.name = name;
	}
}
