import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonConfig } from './common/logger/config';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: WinstonModule.createLogger(winstonConfig),
        bufferLogs: true,
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
