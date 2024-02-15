import { MiddlewareInterface } from '../middleware.interface';
import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddleware implements MiddlewareInterface {
	constructor(private clazz: ClassConstructor<object>) {}

	execute({ body }: Request, res: Response, next: NextFunction): void {
		const instance = plainToClass(this.clazz, body);
		validate(instance).then((errors) => {
			if (errors.length > 0) {
				res.status(422).send(errors);
			} else {
				next();
			}
		});
	}
}
