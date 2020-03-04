import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { UsersService } from './users.service';
import { usersProvider } from './users.provider';

describe('Users Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports:[DatabaseModule],
      providers: [
        UsersService,
        ...usersProvider
      ]

    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
