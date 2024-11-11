import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { QuizModule } from './quiz/quiz.module';

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
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
