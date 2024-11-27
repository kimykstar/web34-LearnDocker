import { Injectable } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';
import { UserSession } from '../types/session';

const LIMIT = 500;

@Injectable()
export class RequestService {
    constructor(private readonly cacheService: CacheService) {}
    validRequestInterval(sessionId: string) {
        const sessionDatas = this.cacheService.get(sessionId) as UserSession;
        const prevReqTime = sessionDatas.lastRequest.getTime();
        const currentReqTime = new Date().getTime();
        const interval = currentReqTime - prevReqTime;
        if (interval < LIMIT) return false;
        this.cacheService.set(sessionId, {
            ...sessionDatas,
            lastRequest: new Date(),
        });
        return true;
    }
}
