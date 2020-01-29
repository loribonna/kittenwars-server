import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IUser } from 'src/interfaces/users.interface';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async handlePassportAuth(profile: IUser): Promise<{ jwt: string }> {
		try {
			let user = await this.userService.findById(profile.account.id);

			if (!user) {
				user = await this.userService.create(profile);
			}

			const payload = {
				sub: profile.account.id,
				username: profile.username,
			};

			return { jwt: this.jwtService.sign(payload) };
		} catch (e) {
			throw new InternalServerErrorException('validateOAuthLogin', e);
		}
	}
}
