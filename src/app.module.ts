import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KittensModule } from './kittens/kittens.module';

@Module({
	imports: [KittensModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
