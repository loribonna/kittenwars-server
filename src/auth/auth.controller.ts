import {
	Controller,
	Get,
	Req,
	Res,
	Next,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NextFunction } from 'express';
import passport = require('passport');

@Controller('auth')
export class AuthController {
	constructor(private readonly auth: AuthService) {}

	@Get('google/callback')
	async handleOauthCallback(
		@Req() req,
		@Res() res,
		@Next() next: NextFunction,
	) {
		const params = {
			session: false,
			callbackURL: `<domain>/auth/google/callback`,
		};

		// We use callback here, but you can let passport do the redirect
		// http://www.passportjs.org/docs/downloads/html/#custom-callback
		passport.authenticate('google', params, (err, user) => {
			if (err) return next(err);
			if (!user) return next(new UnauthorizedException());

			// I generate the JWT token myself and redirect the user,
			// but you can make it more smart.
			//this.generateTokenAndRedirect(req, res, user);
			return next(user);
		})(req, res, next);
	}

	@Get('google')
	async handleOauthRequest(
		@Req() req,
		@Res() res,
		@Next() next: NextFunction,
	) {
		const params = {
			session: false,
			scope: ['<specify scope base on provider>'],
			callbackURL: `<domain>/auth/google/callback`,
		};
		passport.authenticate('google', params)(req, res, next);
	}
}
