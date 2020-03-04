import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IUser } from '../interfaces/users.interface';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	createJWTToken(profile: IUser): { jwt: string } {
		const payload = {
			sub: profile.account.id,
			username: profile.username,
		};

		return { jwt: this.jwtService.sign(payload) };
	}

	async handlePassportAuth(profile: IUser): Promise<{ jwt: string }> {
		try {
			let user = await this.userService.findById(profile.account.id);

			if (!user) {
				user = await this.userService.create(profile);
			}

			return this.createJWTToken(profile);
		} catch (e) {
			throw new InternalServerErrorException('validateOAuthLogin', e);
		}
	}
}
