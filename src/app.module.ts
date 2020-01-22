import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KittensModule } from './kittens/kittens.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [KittensModule, AuthModule, UsersModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
