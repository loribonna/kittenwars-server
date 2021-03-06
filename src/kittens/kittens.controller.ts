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
	Body,
	UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateImageDto } from '../dto/create-image.dto';
import { diskStorage } from 'multer';
import { IKitten } from '../interfaces/kitten.interface';
import { KittenService } from './kitten.service';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { fetchImageAndSend } from '../helpers/fetch-img';
import { CreateKittenDtoValidatorPipe } from '../dto/create-kitten.dto';

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
	@UsePipes(new CreateKittenDtoValidatorPipe())
	@UseGuards(AuthGuard('jwt'))
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
		@Body() body,
		@UploadedFile() uplKitten: CreateImageDto,
	) {
		if (!uplKitten) {
			throw new InternalServerErrorException('No file provided');
		}
		const savedKitten = await this.kittenService.create(
			uplKitten,
			body.kitten,
		);
		return savedKitten;
	}
}
