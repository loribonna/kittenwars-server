import { Module } from '@nestjs/common';
import { AppController, BaseController } from './app.controller';
import { KittensModule } from './kittens/kittens.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VoteModule } from './vote/vote.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ScoreController } from './score/score.controller';
import { ScoreModule } from './score/score.module';
import { AdminModule } from './admin/admin.module';

@Module({
	imports: [
		VoteModule,
		KittensModule,
		AuthModule,
		UsersModule,
		ServeStaticModule.forRoot({
			rootPath: join(__dirname,'..','statics')
		}),
		ScoreModule,
		AdminModule
	],
	controllers: [AppController, BaseController, ScoreController]
})
export class AppModule {}
