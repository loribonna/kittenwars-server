import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { IUser } from 'src/interfaces/users.interface';
import { AuthMode, BASE_URL } from 'src/constants/constants';
import {
	Strategy,
	StrategyOptionWithRequest,
} from 'passport-google-oauth20';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(private auth: AuthService) {
		super(<StrategyOptionWithRequest>{
			clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
			clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
			callbackURL: BASE_URL + '/auth/google/callback',
			passReqToCallback: true,
			scope: ['profile'],
		});
	}

	async validate(req, accessToken, refreshToken, profile, done) {
		const user: IUser = {
			username: profile.displayName,
			method: AuthMode.google,
			account: {
				id: profile.id,
				token: accessToken,
			},
			score: 0
		};

		try {
			const newUser = await this.auth.handlePassportAuth(user);

			done(null, newUser);
		} catch (e) {
			done(e, false);
		}
	}
}
