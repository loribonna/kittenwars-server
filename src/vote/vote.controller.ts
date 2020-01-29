import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Put,
	Body,
	UseGuards
} from '@nestjs/common';
import { KittenService } from 'src/kittens/kitten.service';
import { IKitten } from 'src/interfaces/kitten.interface';
import { KittenInfoDto } from 'src/dto/kitten-info.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('vote')
export class VoteController {
	constructor(private readonly kittenService: KittenService) {}

	@Get()
	@UseGuards(AuthGuard('jwt'))
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
	@UseGuards(AuthGuard('jwt'))
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
