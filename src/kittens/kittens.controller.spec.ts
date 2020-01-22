import { Test, TestingModule } from '@nestjs/testing';
import { KittensController } from './kittens.controller';

describe('Kittens Controller', () => {
  let controller: KittensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KittensController],
    }).compile();

    controller = module.get<KittensController>(KittensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
