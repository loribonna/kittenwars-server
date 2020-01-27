import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleAuthStrategy } from './google.strategy';

@Module({
	imports: [GoogleAuthStrategy],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {
}
