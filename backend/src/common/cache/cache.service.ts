import { Injectable } from '@nestjs/common';

export interface ContainerSession {
    containerId: string;
    startTime: Date;
    renew: boolean;
}

@Injectable()
export class CacheService {
    private readonly store = new Map<string, ContainerSession>();

    get(key: string) {
        const session = this.store.get(key);
        return session != null ? { ...session } : null;
    }

    set(key: string, value: ContainerSession) {
        this.store.set(key, value);
    }

    delete(key: string) {
        this.store.delete(key);
    }
}
