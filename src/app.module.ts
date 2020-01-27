import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KittensModule } from './kittens/kittens.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VoteModule } from './vote/vote.module';

@Module({
	imports: [
		VoteModule,
		KittensModule,
		AuthModule,
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
