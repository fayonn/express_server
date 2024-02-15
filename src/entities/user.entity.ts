import { UserDto } from '../dto/user.dto';
import { UserModel } from '@prisma/client';

export class User {
	private _id: number;
	private _name: string;
	private _email: string;
	private _password: string;

	get id(): number {
		return this._id;
	}

	set id(value: number) {
		this._id = value;
	}

	constructor(name: string, email: string, password: string) {
		this._name = name;
		this._email = email;
		this._password = password;
	}

	ofDto(): UserDto {
		return new UserDto(this._id, this._email, this._password, this._name);
	}

	static fromModel(model: UserModel): User {
		const user = new User(model.name, model.email, model.password);
		user.id = model.id;
		return user;
	}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get email(): string {
		return this._email;
	}

	set email(value: string) {
		this._email = value;
	}

	get password(): string {
		return this._password;
	}

	set password(value: string) {
		this._password = value;
	}
}
