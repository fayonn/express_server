import { BaseController } from '../common/base.controller';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { DEPENDENCY_TYPE } from '../container/dependency-type';
import { LoggerService } from '../services/logger.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../services/auth.service';
import { ValidateMiddleware } from '../common/middlewares/validate.middleware';
import { User } from '../entities/user.entity';
import { ConfigService } from '../config/config.service';
import * as console from 'console';

@injectable()
export class AuthController extends BaseController {
	constructor(
		@inject(DEPENDENCY_TYPE.LoggerService) private logger: LoggerService,
		@inject(DEPENDENCY_TYPE.AuthService) private authService: AuthService,
		@inject(DEPENDENCY_TYPE.ConfigService) private config: ConfigService,
	) {
		super();
		this.bindRoutes([
			{ path: `/login`, method: 'post', func: this.login, middlewares: [new ValidateMiddleware(LoginDto)] },
			{ path: `/register`, method: 'post', func: this.register, middlewares: [new ValidateMiddleware(RegisterDto)] },
		]);
	}

	async login({ body }: Request<{}, {}, LoginDto>, res: Response, next: NextFunction): Promise<void> {
		this.logger.info('/login');
		try {
			res.status(200).send(await this.authService.login(body.email, body.password));
		} catch (err) {
			next(err);
		}
	}

	async register({ body }: Request<{}, {}, RegisterDto>, res: Response, next: NextFunction): Promise<void> {
		this.logger.info('/register');
		try {
			const user = await this.authService.register(new User(body.name, body.email, body.password));
			const jwt = await this.authService.generateJWT(user, this.config.get<string>('JWT_SECRET'));
			res.status(201).send({ jwt });
		} catch (err) {
			next(err);
		}
	}
}
