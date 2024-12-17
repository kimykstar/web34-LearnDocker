import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizModule } from './quiz/quiz.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SandboxModule } from './sandbox/sandbox.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import {
    BusinessExceptionsFilter,
    HttpExceptionsFilter,
    LastExceptionFilter,
} from './common/exception/filters';
import { AuthModule } from './common/auth/auth.module';
import { LoggerMiddleware } from './common/logger/middleware';
import { ScheduleModule } from '@nestjs/schedule';
import { RequestModule } from './common/request/request.module';
import { RequestInterceptor } from './common/request/request.interceptor';
import { CacheModule } from './common/cache/cache.module';
import { LoginModule } from './login/login.module';

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
        QuizModule,
        SandboxModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'frontend', 'dist'),
            exclude: ['/api*'],
            renderPath: '/*',
        }),
        AuthModule,
        RequestModule,
        ScheduleModule.forRoot(),
        CacheModule,
        LoginModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: LastExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionsFilter,
        },
        {
            provide: APP_FILTER,
            useClass: BusinessExceptionsFilter,
        },
        Logger,
        {
            provide: APP_INTERCEPTOR,
            useClass: RequestInterceptor,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
