import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { GoogleAuthStrategy } from './google.strategy';
import { AuthService } from './auth.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { ExtractJwt } from 'passport-jwt';
import { PassportModule } from '@nestjs/passport';

const jwtServiceMock = {
	sign: data => 'test',
};

const googleAuthStrategyMock = {
	async validate(req, accessToken, refreshToken, profile, done) {
		done(null, { name: 'name' });
	},
};

describe('Auth Controller', () => {
	let controller: AuthController;
	let jwtMock: JwtService;

	beforeEach(async () => {
		process.env.JWT_SECRET_KEY = 'testtesttesttest';
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			imports: [
				UsersModule,
				PassportModule.register({ session: true }),
				JwtModule.register({
					secret: process.env.JWT_SECRET_KEY,
					signOptions: { expiresIn: '3000s' },
				}),
			],
			providers: [
				AuthService,
				{
					provide: GoogleAuthStrategy,
					useValue: googleAuthStrategyMock,
				},
				JwtStrategy,
				{ provide: JwtService, useValue: jwtServiceMock },
			],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
