import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IUser } from '../interfaces/users.interface';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Get('board')
	@UseGuards(AuthGuard('jwt'))
	async getScoreBoard() {
		return this.userService.getScoreBoard();
	}

	@Get('position')
	@UseGuards(AuthGuard('jwt'))
	async getUserScoreBoard(@Req() req: Request) {
		const user = await this.userService.findById((<any>req.user).userId);
		return this.userService.getPositionScoreBoard(user);
	}

	@Get('score')
	@UseGuards(AuthGuard('jwt'))
	async getUserScore(@Req() req: Request) {
		const user = await this.userService.findById((<any>req.user).userId);
		return user.score;
	}

	@Get()
	@UseGuards(AuthGuard('jwt'))
	async getUserInfo(@Req() req: Request): Promise<IUser> {
		const user = await this.userService.findById((<any>req.user).userId);
		return user;
	}
}
