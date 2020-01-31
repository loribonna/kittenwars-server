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

	@Get('kitten')
	@UseGuards(AuthGuard('jwt'))
	async getMostLikedKittens() {
        return this.kittenService.getMostLikedKittens();
	}
}
