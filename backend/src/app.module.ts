import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_FILTER } from '@nestjs/core';
import { BusinessExceptionsFilter, LastExceptionFilter } from './common/exception/filters';

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
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'frontend', 'dist'),
            renderPath: '/',
        }),
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
    ],
})
export class AppModule {}
