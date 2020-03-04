import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { KittenService } from '../kittens/kitten.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { KittensModule } from '../kittens/kittens.module';

describe('Admin Controller', () => {
	let controller: AdminController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AdminController],
			imports: [KittensModule, UsersModule],
		}).compile();

		controller = module.get<AdminController>(AdminController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
