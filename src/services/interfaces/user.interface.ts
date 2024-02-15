import { User } from '../../entities/user.entity';

export interface UserInterface {
	createUser(user: User): Promise<User | null>;
	getUser(id?: string): Promise<User | null>;
}
