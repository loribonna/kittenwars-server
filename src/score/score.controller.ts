import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
import { KittenService } from 'src/kittens/kitten.service';

@Controller('score')
export class ScoreController {
	constructor(
		private readonly userService: UsersService,
		private readonly kittenService: KittenService,
	) {}

	@Get('best')
	@UseGuards(AuthGuard('jwt'))
	async getMostLikedKittens() {
        return this.kittenService.getMostLikedKittens();
	}

	@Get('worst')
	@UseGuards(AuthGuard('jwt'))
	async getLeastLikedKittens() {
        return this.kittenService.getLeastLikedKittens();
	}
}
