import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KittensModule } from './kittens/kittens.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost/nest'),
		KittensModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
