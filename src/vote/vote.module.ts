import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { DatabaseModule } from '../database/database.module';
import { KittenService } from '../kittens/kitten.service';
import { kittenProvider } from '../kittens/kitten.provider';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [DatabaseModule, UsersModule],
	controllers: [VoteController],
	providers: [KittenService, ...kittenProvider]
})
export class VoteModule {}
