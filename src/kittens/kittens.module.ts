import { Module } from '@nestjs/common';
import { KittensController } from './kittens.controller';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseModule } from 'src/database/database.module';
import { KittenService } from './kitten.service';
import { kittenProvider } from './kitten.provider';

@Module({
	imports: [
		DatabaseModule,
		MulterModule.register({
			dest: './files',
		}),
	],
	controllers: [KittensController],
	providers: [KittenService, ...kittenProvider],
})
export class KittensModule {}
