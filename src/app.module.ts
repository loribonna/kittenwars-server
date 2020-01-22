import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KittensModule } from './kittens/kittens.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule.forRoot(), KittensModule, AuthModule, UsersModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
