import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('app')
export class AppController {
	constructor() {}

	@Get('')
	redirectToKittens(@Res() res: Response) {
		res.redirect('/app/kittens');
	}

	@Get('*')
	getApp(@Res() res: Response) {
		res.sendFile('index.html', { root: './statics' });
	}
}

@Controller()
export class BaseController {
	constructor() {}

	@Get()
	redirectToApp(@Res() res: Response) {
		res.redirect('/app/kittens');
	}
}
