import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { KittensModule } from './kittens/kittens.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VoteModule } from './vote/vote.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
	imports: [
		VoteModule,
		KittensModule,
		AuthModule,
		UsersModule,
		ServeStaticModule.forRoot({
			rootPath: join(__dirname,'..','statics')
		})
	],
	controllers: [AppController]
})
export class AppModule {}
