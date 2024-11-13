import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonConfig } from './common/logger/config';
import { WinstonModule } from 'nest-winston';
import cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: WinstonModule.createLogger(winstonConfig),
        bufferLogs: true,
    });
    app.use(cookieParser());
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
