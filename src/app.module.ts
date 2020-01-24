import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KittensModule } from './kittens/kittens.module';
import { VoteModule } from './vote/vote.module';

@Module({
	imports: [KittensModule, VoteModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
