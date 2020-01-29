import {
	Controller,
	Get,
	Req,
	Res,
	Next,
	UnauthorizedException,
	UseGuards,
	InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NextFunction, Request, Response } from 'express';
import passport = require('passport');
import { AuthGuard } from '@nestjs/passport';
import { BASE_URL } from 'src/constants/constants';

@Controller('auth')
export class AuthController {
	constructor(private readonly auth: AuthService) {}

	@Get('google/callback')
	@UseGuards(AuthGuard('google'))
	async handleOauthCallback(@Req() req: Request, @Res() res: Response) {
		const jwt: string = (<any>req.user).jwt;

		if (jwt) res.redirect('http://' + BASE_URL + '/app/jwt/' + jwt);
		else {
			console.log('JWT ERROR');
			throw new InternalServerErrorException('JWT error');
		}
	}

	@Get('google')
	@UseGuards(AuthGuard('google'))
	async handleOauthRequest(
		@Req() req,
		@Res() res,
		@Next() next: NextFunction,
	) {
		const params = {
			session: false,
			scope: ['profile'],
			callbackURL: `http://` + BASE_URL + `auth/google/callback`,
		};
		passport.authenticate('google', params)(req, res, next);
	}
}
