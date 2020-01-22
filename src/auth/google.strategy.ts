import { Injectable } from '@nestjs/common';
import { NextFunction } from 'express';
import { OAuth2Strategy, IOAuth2StrategyOptionWithRequest } from 'passport-google-oauth';
import { AuthService } from './auth.service';
import { IUser } from 'src/interfaces/users.interface';
import { AuthMode } from 'src/constants/constants';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';

const BASE_URL = 'localhost:3000';

@Injectable()
export class GoogleAuthStrategy extends OAuth2Strategy {
	constructor() {
		super(
			<IOAuth2StrategyOptionWithRequest>{
				clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
				clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
				callbackURL: 'http://' + BASE_URL + '/auth/google/callback',
				passReqToCallback: true,
			},
			(req, accessToken, refreshToken, profile, done) => {
				const user: IUser = {
					email: profile.emails[0].value,
					//image: profile._json.image.url,
					username: profile.displayName,
					method: AuthMode.google,
					account: {
						id: profile.id,
						token: accessToken,
					},
				};
				return done(null, user);
			},
    );
    passport.use(<any>this);

    passport.serializeUser((user, done) => {
      done(null, user);
    });
      
    passport.deserializeUser((user, done) => {
      done(null, user);
    });

  }

}
