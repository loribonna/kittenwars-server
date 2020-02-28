import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersModule } from 'src/users/users.module';
import { KittensModule } from 'src/kittens/kittens.module';

@Module({
  imports: [UsersModule, KittensModule],
  controllers: [AdminController]
})
export class AdminModule {}
