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

interface Survey {}

@Controller('kittens')
export class KittensController {
	constructor(private readonly kittenService: KittenService) {}

	@Get(':name')
	async getKittenInfo(@Param('name') kittenName): Promise<IKitten> {
		return this.kittenService.findByName(kittenName)[0];
	}

	@Get(':name/data')
	async getKitten(@Param('name') kittenName, @Res() res) {
		const kittenInfo = await this.getKittenInfo(kittenName);
		console.log(kittenInfo[0], kittenInfo[0].savedName);
		res.sendFile(kittenInfo[0].savedName, { root: './files' });
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
