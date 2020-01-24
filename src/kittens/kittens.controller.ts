import {
	Controller,
	Get,
	Put,
	Res,
	Post,
	UseInterceptors,
	UploadedFile,
	Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateKittenDto } from 'src/dto/create-kitten.dto';
import { CreateImageDto } from 'src/dto/create-image.dto';
import { diskStorage } from 'multer';
import { IKitten } from 'src/interfaces/kitten.interface';
import { KittenService } from './kitten.service';
import { Response } from 'express';

interface Survey {}

@Controller('kittens')
export class KittensController {
	constructor(private readonly kittenService: KittenService) {}

	@Get(':name')
	async getKittenInfo(@Param('name') kittenName): Promise<IKitten> {
		return this.kittenService.findByName(kittenName);
	}

	@Get(':name/data')
	async getKitten(@Param('name') kittenName, @Res() res: Response) {
		const kittenInfo = await this.getKittenInfo(kittenName);
		console.log(kittenInfo, kittenInfo.savedName);
		res.sendFile(<string>kittenInfo.savedName, { root: './files' });
	}

	@Put()
	voteKittens(): Survey {
		return {};
	}

	@Post()
	@UseInterceptors(
		FileInterceptor('image', {
			storage: diskStorage({
				destination: './files',
				filename: (req, file, cb) => {
					cb(
						null,
						file.fieldname +
							'_' +
							Date.now() +
							'_' +
							file.originalname,
					);
				},
			}),
		}),
	)
	async insertKitten(@UploadedFile() uplKitten: CreateImageDto) {
		const savedKitten = await this.kittenService.create(uplKitten);
		console.log(savedKitten);
		return savedKitten;
	}
}
