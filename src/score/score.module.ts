import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { KittensModule } from '../kittens/kittens.module';

@Module({
    imports: [KittensModule],
    controllers: [ScoreController]
})
export class ScoreModule {}
