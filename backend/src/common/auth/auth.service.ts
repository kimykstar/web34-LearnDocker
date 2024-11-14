import { Injectable } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';
import { SESSION_DURATION } from '../constant';

@Injectable()
export class AuthService {
    constructor(private readonly cacheService: CacheService) {}

    validateSession(sessionId?: string) {
        if (sessionId == null) {
            return false;
        }
        const session =  this.cacheService.get(sessionId);
        if (session == null) {
            return false;
        }
        if (new Date().getTime() - session.startTime.getTime() > SESSION_DURATION) {
            return false;
        }
        return true
    }
}
