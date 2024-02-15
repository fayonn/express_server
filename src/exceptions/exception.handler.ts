import { Request, Response, NextFunction } from 'express';
import { IExceptionHandler } from './exception.handler.interface';
import { injectable, inject } from 'inversify';
import { DEPENDENCY_TYPE } from '../container/dependency-type';
import { LoggerService } from '../services/logger.service';
import 'reflect-metadata';
import { HttpError } from './http-error';

@injectable()
export class ExceptionHandler implements IExceptionHandler {
	constructor(@inject(DEPENDENCY_TYPE.LoggerService) private logger: LoggerService) {
		this.logger = logger;
	}

	public catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HttpError) {
			this.logger.error(`Status code: ${err.statusCode} | [${err.context}] | Message: ${err.message}`);
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error(err.message);
			res.status(500).send({ err: err.message });
		}
	}
}
