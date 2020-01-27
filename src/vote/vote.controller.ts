import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Put,
	Body
} from '@nestjs/common';
import { KittenService } from 'src/kittens/kitten.service';
import { IKitten } from 'src/interfaces/kitten.interface';
import { KittenInfoDto } from 'src/dto/kitten-info.dto';

@Controller('vote')
export class VoteController {
	constructor(private readonly kittenService: KittenService) {}

	@Get()
	async getKittens(): Promise<IKitten[]> {
		try {
			return this.kittenService.getRandomKittens(2);
		} catch (e) {
			console.error(e);
			throw new HttpException(
				'Server Error',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	@Put()
	async voteKittens(@Body() kitten: KittenInfoDto): Promise<IKitten> {
		try {
			return this.kittenService.voteKitten(kitten.savedName);
		} catch (e) {
			console.error(e);
			throw new HttpException(
				'Server Error',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
