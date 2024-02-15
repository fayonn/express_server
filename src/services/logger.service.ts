import { Logger } from 'tslog';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class LoggerService {
	private logger: Logger<unknown>;

	constructor() {
		this.logger = new Logger({});
	}

	info(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
