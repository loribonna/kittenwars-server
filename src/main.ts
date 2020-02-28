import * as dotenv from 'dotenv';
dotenv.config({ path: 'src/.env' });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import passport = require('passport');
import * as session from 'express-session';
import { MONGODB_CONNECTION_URI } from './constants/constants';
const MongoStore = require('connect-mongo')(session);
import * as bodyParser from 'body-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(bodyParser.json({ limit: '17mb' }));
	app.use(
		bodyParser.urlencoded({
			limit: '17mb',
			extended: true,
			parameterLimit: 50000,
		}),
	);

	app.enableCors();
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	app.use(
		session({
			secret: process.env.EXPRESS_SECRET,
			saveUninitialized: true,
			resave: true,
		}),
	);
	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		done(null, user);
	});

	await app.listen(process.env.PORT || 3000);
}

bootstrap();
