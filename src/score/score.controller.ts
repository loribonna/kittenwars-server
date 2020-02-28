import {
	Controller,
	Get,
	UseGuards,
	Req,
	Param,
	Res,
	UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';
import { KittenService } from 'src/kittens/kitten.service';
import { fetchImageAndSend } from 'src/helpers/fetch-img';
var fs = require('fs');

@Controller('score')
export class ScoreController {
	constructor(
		private readonly kittenService: KittenService
	) {}

	@Get('best')
	async getMostLikedKittens() {
		return this.kittenService.getMostLikedKittens();
	}

	@Get('worst')
	async getLeastLikedKittens() {
		return this.kittenService.getLeastLikedKittens();
	}

	@Get('worst/:name')
	async getLeastLikedKittenImg(
		@Param('name') kittenName: string,
		@Res() res: Response,
	) {
		const kittens = await this.kittenService.getLeastLikedKittens();
		if (kittens.findIndex(k => k.savedName === kittenName) < 0) {
			throw new UnauthorizedException(`Kitten ${kittenName} is not a valid worst kitten`);
		}else{
			return fetchImageAndSend(kittenName, res);

		}
	}

	@Get('best/:name')
	async getMostLikedKittenImg(
		@Param('name') kittenName: string,
		@Res() res: Response,
	) {
		const kittens = await this.kittenService.getMostLikedKittens();
		if (kittens.findIndex(k => k.savedName === kittenName) < 0) {
			throw new UnauthorizedException(
				`Kitten ${kittenName} is not a valid best kitten`,
			);
		} else {
			return fetchImageAndSend(kittenName, res);
		}
	}
}
