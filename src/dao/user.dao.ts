import { User } from '../entities/user.entity';
import { injectable, inject } from 'inversify';
import { DEPENDENCY_TYPE } from '../container/dependency-type';
import { PrismaService } from '../db/prisma.service';

@injectable()
export class UserDao {
	constructor(@inject(DEPENDENCY_TYPE.PrismaService) private prismaService: PrismaService) {}
	async create({ email, name, password }: User): Promise<User> {
		const model = await this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				name,
			},
		});
		return User.fromModel(model);
	}

	async findByEmail(email: string): Promise<User | null> {
		const model = await this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});

		if (model === null) return null;
		return User.fromModel(model);
	}
}
