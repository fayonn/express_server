import { injectable, inject } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { DEPENDENCY_TYPE } from '../container/dependency-type';
import { LoggerService } from '../services/logger.service';

@injectable()
export class PrismaService {
	private readonly _client: PrismaClient;

	constructor(@inject(DEPENDENCY_TYPE.LoggerService) private logger: LoggerService) {
		this._client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this._client.$connect();
			this.logger.info('Data base was connected');
		} catch (e) {
			this.logger.error(`[PrismaService] -> connect ERROR: ${e}`);
		}
	}

	async disconnect(): Promise<void> {
		try {
			await this._client.$disconnect();
			this.logger.info('Data base was disconnected');
		} catch (e) {
			this.logger.error(`[PrismaService] -> disconnect ERROR: ${e}`);
		}
	}

	get client(): PrismaClient {
		return this._client;
	}
}
