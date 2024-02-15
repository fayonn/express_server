import { AuthInterface } from './interfaces/auth.interface';
import { injectable, inject } from 'inversify';
import { DEPENDENCY_TYPE } from '../container/dependency-type';
import { UserService } from './user.service';
import { LoggerService } from './logger.service';
import { User } from '../entities/user.entity';
import { HttpError } from '../exceptions/http-error';
import { ConfigService } from '../config/config.service';
import { sign } from 'jsonwebtoken';

@injectable()
export class AuthService implements AuthInterface {
	constructor(
		@inject(DEPENDENCY_TYPE.UserService) private userService: UserService,
		@inject(DEPENDENCY_TYPE.LoggerService) private logger: LoggerService,
	) {
		logger.info('init AuthService');
	}

	async login(email: string, password: string): Promise<User> {
		this.logger.info('login');
		const user = await this.userService.getUser(email);
		if (!user) {
			this.logger.error(`User ${email} not found`);
			throw new HttpError(404, `User ${email} not found`);
		}

		return user;
	}

	async register(user: User): Promise<User> {
		this.logger.info('register');

		if (await this.userService.getUser(user.email)) {
			this.logger.error(`User ${user.email} already exists`);
			throw new HttpError(404, `User ${user.email} already exists`);
		}

		const newUser = await this.userService.createUser(user);
		if (!newUser) {
			this.logger.error(`User ${user.email} was not created`);
			throw new HttpError(404, `User ${user.email} was not created`);
		}

		return newUser;
	}

	async generateJWT(user: User, secret: string): Promise<string> {
		return new Promise((resolve, reject) => {
			sign(
				{
					email: user.email,
					id: user.id,
					name: user.name,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{ algorithm: 'HS256' },
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	}
}
