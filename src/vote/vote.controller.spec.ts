import { Test, TestingModule } from '@nestjs/testing';
import { VoteController } from './vote.controller';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { KittenService } from '../kittens/kitten.service';
import { kittenProvider } from '../kittens/kitten.provider';

describe('Vote Controller', () => {
	let controller: VoteController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [VoteController],
			imports: [DatabaseModule, UsersModule],
			providers: [KittenService, ...kittenProvider],
		}).compile();

		controller = module.get<VoteController>(VoteController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
