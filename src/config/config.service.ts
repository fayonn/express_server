import { DotenvParseOutput, DotenvConfigOutput, config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { DEPENDENCY_TYPE } from '../container/dependency-type';
import { LoggerService } from '../services/logger.service';

@injectable()
export class ConfigService {
	private readonly config: DotenvParseOutput;

	constructor(@inject(DEPENDENCY_TYPE.LoggerService) private logger: LoggerService) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('Config was not loaded');
		} else {
			this.logger.info('Config was loaded');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get<T extends string | number>(key: string): T {
		return this.config[key] as T;
	}
}
