import { MiddlewareInterface } from '../middleware.interface';
import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import { User } from '../../entities/user.entity';

export class AuthMiddleware implements MiddlewareInterface {
	constructor(private jwtSecret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.jwtSecret, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					req.user = {
						email: (payload as JwtPayload).email,
						name: (payload as JwtPayload).name,
						id: (payload as JwtPayload).id,
					} as User;
					next();
				}
			});
		} else {
			next();
		}
	}
}
