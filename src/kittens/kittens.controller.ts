import {
	Controller,
	Get,
	Put,
	Res,
	Post,
	UseInterceptors,
	UploadedFile,
	Param,
	UseGuards,
	InternalServerErrorException,
	Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateImageDto } from 'src/dto/create-image.dto';
import { diskStorage } from 'multer';
import { IKitten } from 'src/interfaces/kitten.interface';
import { KittenService } from './kitten.service';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { fetchImageAndSend } from 'src/helpers/fetch-img';

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
	async getKitten(@Param('name') kittenName: string, @Res() res: Response) {
		return fetchImageAndSend(kittenName, res);
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
	async insertKitten(
		@Req() req: Request,
		@UploadedFile() uplKitten: CreateImageDto,
	) {
		if (!uplKitten) {
			throw new InternalServerErrorException('No file provided');
		}
		console.log(uplKitten.filename);
		const savedKitten = await this.kittenService.create(uplKitten);
		return savedKitten;
	}
}
