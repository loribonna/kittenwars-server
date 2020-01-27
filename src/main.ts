import * as dotenv from 'dotenv';
dotenv.config({path:'src/.env'});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import passport = require('passport');
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({transform: true}));

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
