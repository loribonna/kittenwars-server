import { Test, TestingModule } from '@nestjs/testing';
import { ScoreController } from './score.controller';
import { KittensModule } from '../kittens/kittens.module';

describe('Score Controller', () => {
	let controller: ScoreController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ScoreController],
			imports: [KittensModule],
		}).compile();

		controller = module.get<ScoreController>(ScoreController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
