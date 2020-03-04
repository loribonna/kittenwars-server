import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersModule } from '../users/users.module';
import { KittensModule } from '../kittens/kittens.module';

@Module({
  imports: [UsersModule, KittensModule],
  controllers: [AdminController]
})
export class AdminModule {}
