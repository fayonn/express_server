import express, { Express } from 'express';
import { Server } from 'http';
import { injectable, inject } from 'inversify';
import { DEPENDENCY_TYPE } from './container/dependency-type';
import { UserController } from './controllers/user.controller';
import { ExceptionHandler } from './exceptions/exception.handler';
import 'reflect-metadata';
import { LoggerService } from './services/logger.service';
import { AuthController } from './controllers/auth.controller';
import { json } from 'body-parser';
import { PrismaService } from './db/prisma.service';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { ConfigService } from './config/config.service';

@injectable()
export class App {
	private app: Express;
	private server: Server;
	private port = 8000;

	constructor(
		@inject(DEPENDENCY_TYPE.UserController) private userController: UserController,
		@inject(DEPENDENCY_TYPE.ExceptionHandler) private exceptionHandler: ExceptionHandler,
		@inject(DEPENDENCY_TYPE.LoggerService) private logger: LoggerService,
		@inject(DEPENDENCY_TYPE.AuthController) private authController: AuthController,
		@inject(DEPENDENCY_TYPE.PrismaService) private prismaService: PrismaService,
		@inject(DEPENDENCY_TYPE.ConfigService) private config: ConfigService,
	) {
		this.app = express();
	}

	private useMiddleware(): void {
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.config.get<string>('JWT_SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	private useRoutes(): void {
		this.app.use('/v1/users', this.userController.router);
		this.app.use('/v1/auth', this.authController.router);
	}

	private useExceptionHandlers(): void {
		this.app.use(this.exceptionHandler.catch.bind(this.exceptionHandler));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionHandlers();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.info(`Server has been started on http://localhost:${this.port}`);
	}
}
