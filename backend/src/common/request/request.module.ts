import { Global, Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestGuard } from './request.guard';
import { CacheModule } from '../cache/cache.module';
import { RequestInterceptor } from '../request/request.interceptor';

@Global()
@Module({
    imports: [CacheModule],
    providers: [RequestService, RequestGuard, RequestInterceptor],
    exports: [RequestGuard, RequestService, RequestInterceptor],
})
export class RequestModule {}
