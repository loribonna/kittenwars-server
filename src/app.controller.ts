import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('app')
export class AppController {
	constructor() {}

	@Get('*')
	getApp(@Res() res: Response) {
		res.sendFile('index.html', { root: './statics' });
	}
}
