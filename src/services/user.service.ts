import { UserInterface } from './interfaces/user.interface';
import { inject, injectable } from 'inversify';
import { hash } from 'bcryptjs';
import { DEPENDENCY_TYPE } from '../container/dependency-type';
import { LoggerService } from './logger.service';
import { ConfigService } from '../config/config.service';
import { User } from '../entities/user.entity';
import { UserDao } from '../dao/user.dao';

@injectable()
export class UserService implements UserInterface {
	constructor(
		@inject(DEPENDENCY_TYPE.LoggerService) private logger: LoggerService,
		@inject(DEPENDENCY_TYPE.ConfigService) private config: ConfigService,
		@inject(DEPENDENCY_TYPE.UserDao) private userDao: UserDao,
	) {
		this.logger.info('init UserService');
	}

	async createUser(user: User): Promise<User | null> {
		this.logger.info('createUser');
		// In other ways I caught Error: Invalid salt version
		const salt = parseInt(this.config.get<string>('SALT'));
		user.password = await hash(user.password, salt);
		return await this.userDao.create(user);
	}

	async getUser(email: string): Promise<User | null> {
		this.logger.info('getUser');
		return await this.userDao.findByEmail(email);
	}
}
