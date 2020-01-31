import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { DatabaseModule } from 'src/database/database.module';
import { KittenService } from 'src/kittens/kitten.service';
import { kittenProvider } from 'src/kittens/kitten.provider';
import { UsersModule } from 'src/users/users.module';

@Module({
	imports: [DatabaseModule, UsersModule],
	controllers: [VoteController],
	providers: [KittenService, ...kittenProvider]
})
export class VoteModule {}
