import {
	Controller,
	Get,
	Put,
	Res,
	Post,
	UseInterceptors,
	UploadedFile,
	Param,
	UseGuards
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateImageDto } from 'src/dto/create-image.dto';
import { diskStorage } from 'multer';
import { IKitten } from 'src/interfaces/kitten.interface';
import { KittenService } from './kitten.service';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { join } from 'path';
var fs = require('fs');

interface Survey {}

@Controller('kittens')
export class KittensController {
	constructor(private readonly kittenService: KittenService) {}

	@Get(':name')
	@UseGuards(AuthGuard('jwt'))
	async getKittenInfo(@Param('name') kittenName): Promise<IKitten> {
		return this.kittenService.findByName(kittenName);
	}

	@Get(':name/data')
	@UseGuards(AuthGuard('jwt'))
	async getKitten(@Param('name') kittenName, @Res() res: Response) {
		const kittenInfo = await this.getKittenInfo(kittenName);
		
		fs.readFile(join(__dirname, '..','..', 'files',<string>kittenInfo.savedName), function(err, data) {
			if (err) throw err;
			res.contentType('jpeg')
            res.send(data.toString('base64'));
        });
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
		return savedKitten;
	}
}
