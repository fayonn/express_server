import { Request, Response, NextFunction } from 'express';
import { HttpError } from './http-error';

export interface IExceptionHandler {
	catch(err: HttpError, req: Request, res: Response, next: NextFunction): void;
}
