import { BaseController } from '../common/base.controller';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { LoggerService } from '../services/logger.service';
import { DEPENDENCY_TYPE } from '../container/dependency-type';
import 'reflect-metadata';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';
import { HttpError } from '../exceptions/http-error';
import { AuthGuardMiddleware } from '../common/middlewares/auth.guard.middleware';

@injectable()
export class UserController extends BaseController {
	constructor(
		@inject(DEPENDENCY_TYPE.LoggerService) private logger: LoggerService,
		@inject(DEPENDENCY_TYPE.UserService) private userService: UserService,
	) {
		super();
		this.bindRoutes([
			{ path: `/:userId`, method: 'get', func: this.getUser, middlewares: [new AuthGuardMiddleware()] },
			{ path: ``, method: 'post', func: this.postUser },
		]);
	}

	async getUser(
		req: Request<{ userId: string }, UserDto, any>,
		res: Response<UserDto, {}>,
		next: NextFunction,
	): Promise<void> {
		this.logger.info('/getUser');
		const userId = req.params.userId;
		if (req.user) {
			const user = await this.userService.getUser(req.user.email);
			if (user) {
				res.status(200).send(user?.ofDto());
			} else {
				this.logger.error(`User ${req.user.email} not found`);
				next(new HttpError(400, `User ${req.user.email} not found`));
			}
		} else {
			this.logger.error(`User ${req.query.id} not found`);
			next(new HttpError(400, `User ${req.query.id} not found`));
		}
	}

	async postUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		this.logger.info('/postUser');
		res.status(201).send();
	}
}
