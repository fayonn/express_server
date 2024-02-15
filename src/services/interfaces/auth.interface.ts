import { User } from '../../entities/user.entity';

export interface AuthInterface {
	login(email: string, password: string): Promise<User | null>;
	register(user: User): Promise<User | null>;
	generateJWT(user: User, secret: string): Promise<string>;
}
