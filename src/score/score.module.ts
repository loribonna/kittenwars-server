import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { UsersModule } from 'src/users/users.module';
import { KittensModule } from 'src/kittens/kittens.module';

@Module({
    imports: [UsersModule, KittensModule],
    controllers: [ScoreController]
})
export class ScoreModule {}
