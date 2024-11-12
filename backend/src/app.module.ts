import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { QuizModule } from './quiz/quiz.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SandboxModule } from './sandbox/sandbox.module';
import { SandboxController } from './sandbox/sandbox.controller';
import { SandboxService } from './sandbox/sandbox.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            database: 'test',
            autoLoadEntities: true,
            synchronize: true,
        }),
        UsersModule,
        QuizModule,
        SandboxModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'frontend', 'dist'),
            renderPath: '/',
        }),
        HttpModule,
    ],
    controllers: [AppController, SandboxController],
    providers: [AppService, SandboxService],
})
export class AppModule {}
