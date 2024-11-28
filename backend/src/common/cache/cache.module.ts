import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        HttpModule.register({
            timeout: 10000,
        }),
    ],
    providers: [CacheService],
    exports: [CacheService],
})
export class CacheModule {}
