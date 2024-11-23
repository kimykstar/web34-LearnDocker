import { Injectable } from '@nestjs/common';
import { UserSession } from '../types/session';

@Injectable()
export class CacheService {
    private readonly store = new Map<string, UserSession>();

    get(key: string) {
        const session = this.store.get(key);
        return session != null ? { ...session } : null;
    }

    set(key: string, value: UserSession) {
        this.store.set(key, value);
    }

    updateLevel(key: string, level: number) {
        const session = this.store.get(key);
        if (session != null) {
            session.level = level;
        }
    }

    delete(key: string) {
        this.store.delete(key);
    }
}
