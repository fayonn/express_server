import { User } from '../entities/user.entity';

// declare namespace Express {
// 	export interface Request {
// 		user: User;
// 	}
// }

declare global {
	namespace Express {
		export interface Request {
			user?: User;
		}
	}

	namespace JsonWebToken {
		export interface JwtPayload {
			user: User;
		}
	}
}
