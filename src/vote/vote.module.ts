import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { DatabaseModule } from 'src/database/database.module';
import { KittenService } from 'src/kittens/kitten.service';
import { kittenProvider } from 'src/kittens/kitten.provider';

@Module({
	imports: [DatabaseModule],
	controllers: [VoteController],
	providers: [KittenService, ...kittenProvider]
})
export class VoteModule {}
