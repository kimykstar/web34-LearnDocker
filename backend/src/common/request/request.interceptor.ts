import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';
import { UserSession } from '../types/session';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
    constructor(private readonly cacheService: CacheService) {}
    intercept(context: ExecutionContext, next: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const sessionId = request.cookies['sid'];
        if (
            !(
                context.getClass().name === 'SandboxController' &&
                context.getHandler().name === 'assignContainer'
            )
        ) {
            const sessionDatas = this.cacheService.get(sessionId) as UserSession;
            const currentTime = new Date();
            this.cacheService.set(sessionId, {
                ...sessionDatas,
                lastRequest: currentTime,
            });
        }
        return next.handle();
    }
}
