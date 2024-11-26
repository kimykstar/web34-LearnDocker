import { Injectable } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';
import { SESSION_DURATION } from '../constant';
import { InvalidSessionException, SessionAlreadyAssignedException } from '../exception/errors';

@Injectable()
export class AuthService {
    constructor(private readonly cacheService: CacheService) {}

    validateSession(sessionId?: string) {
        if (sessionId == null) {
            throw new InvalidSessionException();
        }
        const session = this.cacheService.get(sessionId);
        if (session == null) {
            throw new InvalidSessionException();
        }
        if (new Date().getTime() - session.startTime.getTime() > SESSION_DURATION) {
            throw new InvalidSessionException();
        }
        return session;
    }

    throwIfSessionIsValid(hashedSessionID: string, sessionId?: string) {
        try {
            if (sessionId) this.validateSession(sessionId);
            else this.validateSession(hashedSessionID);
            throw new SessionAlreadyAssignedException();
        } catch (error) {
            if (!(error instanceof InvalidSessionException)) {
                throw error;
            }
        }
    }
}
