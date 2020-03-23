import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Put,
	Body,
	UseGuards,
	Req,
} from '@nestjs/common';
import { KittenService } from '../kittens/kitten.service';
import { IKitten } from '../interfaces/kitten.interface';
import { KittenVoteDto } from '../dto/kitten-vote.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { Request } from 'express';

@Controller('vote')
export class VoteController {
	constructor(
		private readonly kittenService: KittenService,
		private readonly userService: UsersService,
	) {}

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
	async voteKittens(
		@Req() req: Request,
		@Body() vote: KittenVoteDto,
	): Promise<Boolean> {
		try {
			const [user, kittenVoted, kittenA, kittenB] = await Promise.all([
				this.userService.findById((<any>req.user).userId),
				this.kittenService.voteKitten(vote.kittenVoted),
				this.kittenService.findById(vote.kittenA),
				this.kittenService.findById(vote.kittenB),
			]);

			const winnerKitten =
				kittenA.votes > kittenB.votes ? kittenA : kittenB;
			if (kittenVoted.savedName === winnerKitten.savedName) {
				this.userService.updateUserScore(user, 1/(<number>kittenVoted.votes+1));
				return true;
			} else {
				this.userService.updateUserScore(user, -1/(<number>kittenVoted.votes+1));
				return false;
			}
		} catch (e) {
			console.error(e);
			throw new HttpException(
				'Server Error',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
