import { Injectable } from '@nestjs/common';
import { UserSession } from '../types/session';
import { SESSION_DURATION, NO_INTERACTION_TIME_LIMIT } from '../constant';
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
        const currentTime = new Date();
        this.store.forEach(async (values, sessionId) => {
            const startTime = new Date(values.startTime);
            if (
                startTime.getTime() + SESSION_DURATION < currentTime.getTime() ||
                currentTime.getTime() > values.lastRequest.getTime() + NO_INTERACTION_TIME_LIMIT
            ) {
                const { containerId } = this.get(sessionId) as UserSession;
                await this.httpService.axiosRef.delete(
                    `${process.env.SANDBOX_URL}/containers/${containerId}?force=true&v=true`
                );

                this.delete(sessionId);
            }
        });
    }
}
