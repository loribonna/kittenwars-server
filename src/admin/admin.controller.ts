import {
	Controller,
	Get,
	UseGuards,
	Req,
	InternalServerErrorException,
	UnauthorizedException,
	Put,
	Body,
	Delete,
	Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { KittenService } from '../kittens/kitten.service';
import { UsersService } from '../users/users.service';
import { Request } from 'express';
import { IUser } from '../interfaces/users.interface';
import { IKitten } from '../interfaces/kitten.interface';
import { KittenEvaluateDto } from '../dto/kitten-evaluate.dto';
import { KittenDeleteDto } from '../dto/kitten-delete.dto';

@Controller('admin')
export class AdminController {
	constructor(
		private readonly kittenService: KittenService,
		private readonly userService: UsersService,
	) {}

	async _checkAdminUser(req: Request): Promise<Boolean> {
		const user = await this.userService.findById((<any>req.user).userId);
		return user.isAdmin;
	}

	@Get('unapproved')
	@UseGuards(AuthGuard('jwt'))
	async getUnapprovedKittens(@Req() req: Request): Promise<IKitten[]> {
		try {
			const isAdmin = await this._checkAdminUser(req);

			if (isAdmin) {
				return this.kittenService.getNotApprovedKittens();
			} else {
				throw new UnauthorizedException('User is not admin');
			}
		} catch (e) {
			console.error(e);
			throw new InternalServerErrorException('Server error');
		}
	}

	@Put('evaluate')
	@UseGuards(AuthGuard('jwt'))
	async evaluateKitten(@Req() req: Request, @Body() val: KittenEvaluateDto) {
		try {
			const isAdmin = await this._checkAdminUser(req);

			if (isAdmin) {
				if (val.accepted) {
					await this.kittenService.approveKitten(val.kittenId);
				} else {
					await this.kittenService.deleteKitten(val.kittenId);
				}

				return { status: 'ok' };
			} else {
				throw new UnauthorizedException('User is not admin');
			}
		} catch (e) {
			console.error(e);
			throw new InternalServerErrorException('Server error');
		}
	}

	@Delete('kitten')
	@UseGuards(AuthGuard('jwt'))
	async deleteKitten(@Req() req: Request, @Body() kitten: KittenDeleteDto) {
		try {
			const isAdmin = await this._checkAdminUser(req);

			if (isAdmin) {
				await this.kittenService.deleteKitten(kitten.id);
			} else {
				throw new UnauthorizedException('User is not admin');
			}
			
			return { status: 'ok' };
		} catch (e) {
			console.error(e);
			throw new InternalServerErrorException('Server error');
		}
	}

	@Get('approved')
	@UseGuards(AuthGuard('jwt'))
	async getApprovedKittens(@Req() req: Request, @Query() query) {
		let pageNumber, pageSize;

		if (query) {
			pageNumber = query.pageNumber ? query.pageNumber : null;
			pageSize = query.pageSize ? query.pageSize : null;
		}

		try {
			const isAdmin = await this._checkAdminUser(req);

			if (isAdmin) {
				return this.kittenService.getApprovedKittens(pageNumber, pageSize);
			} else {
				throw new UnauthorizedException('User is not admin');
			}
		} catch (e) {
			console.error(e);
			throw new InternalServerErrorException('Server error');
		}
	}
}
