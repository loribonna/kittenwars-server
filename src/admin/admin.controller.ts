import {
	Controller,
	Get,
	UseGuards,
	Req,
	InternalServerErrorException,
	UnauthorizedException,
	Put,
	Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { KittenService } from 'src/kittens/kitten.service';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
import { IUser } from 'src/interfaces/users.interface';
import { IKitten } from 'src/interfaces/kitten.interface';
import { KittenEvaluateDto } from 'src/dto/kitten-evaluate.dto';

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
                console.log(val);
				if (val.accepted) {
					this.kittenService.approveKitten(val.kittenId);
				} else {
					this.kittenService.rejectKitten(val.kittenId);
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
}
