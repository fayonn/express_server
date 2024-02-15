import { Container } from 'inversify';
import { LoggerService } from '../services/logger.service';
import { DEPENDENCY_TYPE } from './dependency-type';
import { ExceptionHandler } from '../exceptions/exception.handler';
import { UserController } from '../controllers/user.controller';
import { App } from '../app';
import 'reflect-metadata';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { AuthInterface } from '../services/interfaces/auth.interface';
import { UserInterface } from '../services/interfaces/user.interface';
import { UserService } from '../services/user.service';
import { ConfigService } from '../config/config.service';
import { PrismaService } from '../db/prisma.service';
import { UserDao } from '../dao/user.dao';

export class AppContainer extends Container {
	constructor() {
		super();

		this.bind<LoggerService>(DEPENDENCY_TYPE.LoggerService).to(LoggerService).inSingletonScope();
		this.bind<ExceptionHandler>(DEPENDENCY_TYPE.ExceptionHandler).to(ExceptionHandler).inSingletonScope();
		this.bind<UserController>(DEPENDENCY_TYPE.UserController).to(UserController).inSingletonScope();
		this.bind<AuthController>(DEPENDENCY_TYPE.AuthController).to(AuthController).inSingletonScope();
		this.bind<AuthInterface>(DEPENDENCY_TYPE.AuthService).to(AuthService).inSingletonScope();
		this.bind<UserInterface>(DEPENDENCY_TYPE.UserService).to(UserService).inSingletonScope();
		this.bind<ConfigService>(DEPENDENCY_TYPE.ConfigService).to(ConfigService).inSingletonScope();
		this.bind<PrismaService>(DEPENDENCY_TYPE.PrismaService).to(PrismaService).inSingletonScope();
		this.bind<UserDao>(DEPENDENCY_TYPE.UserDao).to(UserDao).inSingletonScope();
		this.bind<App>(DEPENDENCY_TYPE.Application).to(App).inSingletonScope();
	}
}
