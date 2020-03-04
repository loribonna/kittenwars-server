import { Test, TestingModule } from '@nestjs/testing';
import { KittensController } from './kittens.controller';
import { KittenService } from './kitten.service';
import { kittenProvider } from './kitten.provider';
import { DatabaseModule } from '../database/database.module';

describe('Kittens Controller', () => {
	let controller: KittensController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [KittensController],
			imports: [DatabaseModule],
			providers: [KittenService, ...kittenProvider],
		}).compile();

		controller = module.get<KittensController>(KittensController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
