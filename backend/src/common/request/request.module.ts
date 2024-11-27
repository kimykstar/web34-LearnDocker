import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestGuard } from './request.guard';
import { CacheModule } from '../cache/cache.module';

@Module({
    imports: [CacheModule],
    providers: [RequestService, RequestGuard],
    exports: [RequestGuard, RequestService],
})
export class RequestModule {}
