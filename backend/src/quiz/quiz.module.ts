import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { SandboxModule } from '../sandbox/sandbox.module';
import { CacheModule } from '../common/cache/cache.module';

@Module({
    imports: [TypeOrmModule.forFeature([Quiz]), SandboxModule, CacheModule],
    controllers: [QuizController],
    providers: [QuizService],
})
export class QuizModule {}
