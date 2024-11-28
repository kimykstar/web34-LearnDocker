import { Injectable } from '@nestjs/common';
import { UserSession } from '../types/session';
import { SESSION_DURATION } from '../constant';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CacheService {
    private readonly store = new Map<string, UserSession>();

    constructor(private readonly httpService: HttpService) {}

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

    @Cron(CronExpression.EVERY_10_MINUTES)
    deleteExpiredSession() {
        this.store.forEach(async (values, sessionId) => {
            if (new Date(values.startTime).getTime() + SESSION_DURATION < new Date().getTime()) {
                const { containerId } = this.get(sessionId) as UserSession;
                await this.httpService.axiosRef.delete(
                    `${process.env.SANDBOX_URL}/containers/${containerId}?force=true&v=true`
                );
                this.delete(sessionId);
            }
        });
    }
}
