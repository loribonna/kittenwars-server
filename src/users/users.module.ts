import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProvider } from './users.provider';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';

@Module({
	imports: [DatabaseModule],
	providers: [UsersService, ...usersProvider],
	exports: [UsersService],
	controllers: [UsersController]
})
export class UsersModule {}
