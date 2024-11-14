import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { QuizModule } from './quiz/quiz.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SandboxModule } from './sandbox/sandbox.module';
import { APP_FILTER } from '@nestjs/core';
import { BusinessExceptionsFilter, LastExceptionFilter } from './common/exception/filters';
import { AuthModule } from './common/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            autoLoadEntities: true,
            synchronize: true,
        }),
        UsersModule,
        QuizModule,
        SandboxModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'frontend', 'dist'),
            exclude: ['/api*'],
            renderPath:'/*',
        }),
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: LastExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: BusinessExceptionsFilter,
        },
        Logger,
    ],
})
export class AppModule {}
