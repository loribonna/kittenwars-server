import { Module } from '@nestjs/common';
import { KittensController } from './kittens.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { KittenSchema } from './kitten.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Kitten', schema: KittenSchema }]),
		MulterModule.register({
			dest: './files',
		}),
	],
	controllers: [KittensController],
})
export class KittensModule {}
