import { MiddlewareInterface } from '../middleware.interface';
import { Request, Response, NextFunction } from 'express';

export class AuthGuardMiddleware implements MiddlewareInterface {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.user) return next();
		res.status(401).send({ message: 'Not authorized' });
	}
}
