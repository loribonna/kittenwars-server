import {
	Controller,
	Get,
	Req,
	Res,
	Next,
	UnauthorizedException,
	UseGuards,
	InternalServerErrorException,
	Post,
	Body,
	Param,
	Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NextFunction, Request, Response } from 'express';
import passport = require('passport');
import { AuthGuard } from '@nestjs/passport';
import { BASE_URL, AuthMode } from '../constants/constants';
import { OAuth2Client } from 'google-auth-library';
import { IUser } from '../interfaces/users.interface';

@Controller('auth')
export class AuthController {
	client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

	constructor(private readonly auth: AuthService) {}

	@Get('google/callback')
	@UseGuards(AuthGuard('google'))
	async handleOauthCallback(@Req() req: Request, @Res() res: Response) {
		const jwt: string = (<any>req.user).jwt;

		if (jwt) res.redirect('http://' + BASE_URL + '/app/jwt/' + jwt);
		else {
			throw new InternalServerErrorException('JWT error');
		}
	}

	@Get('google')
	@UseGuards(AuthGuard('google'))
	async handleOauthRequest(
		@Req() req: Request,
		@Res() res: Response,
		@Next() next: NextFunction,
	) {
		const params = {
			session: false,
			scope: ['profile'],
			callbackURL: `http://` + BASE_URL + `/auth/google/callback`,
		};

		passport.authenticate('google', params)(req, res, next);
	}

	@Get('jwt_check')
	@UseGuards(AuthGuard('jwt'))
	async checkJWTToken(@Req() req: Request) {
		const userId: string = (<any>req.user).userId;
		if (userId) {
			return { status: 'ok' };
		} else {
			throw new UnauthorizedException('JWT Token invalid');
		}
	}

	@Get('logout')
	async logout(@Req() req: Request, @Res() res: Response) {
		req.logout();
		res.redirect('/app');
	}

	@Post('google/token')
	async checkGoogleToken(
		@Query('id_token') token: string
	) {
		try{
			const ticket = await this.client.verifyIdToken({
				idToken: token,
				audience: process.env.GOOGLE_APP_CLIENT_ID
			});
			const payload = ticket.getPayload();
			
			const profile: IUser = {
				username: payload.name,
				account: {
					id: payload.sub,
					token: token
				},
				score: 0,
				method: AuthMode.google,
			}
			return this.auth.handlePassportAuth(profile);
		}catch(e){
			throw new UnauthorizedException('Invalid ticket');
		}
		
	}
}
