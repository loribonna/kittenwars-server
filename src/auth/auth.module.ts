import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleAuthStrategy } from './google.strategy';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		UsersModule,
		PassportModule.register({session: true}),
		JwtModule.register({
			secret: process.env.JWT_SECRET_KEY,
			signOptions: { expiresIn: '3000s' },
		}),
	],
	providers: [AuthService, GoogleAuthStrategy, JwtStrategy],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
