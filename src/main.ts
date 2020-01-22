import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import passport = require('passport');
import * as session from 'express-session';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(passport.initialize());
	app.use(passport.session());
	app.use(session({
    secret: process.env.EXPRESS_SECRET,
    resave: true,
    saveUninitialized: true
  }));

	await app.listen(3000);
}
bootstrap();
