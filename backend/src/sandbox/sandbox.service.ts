import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CacheService } from '../common/cache/cache.service';
import { randomUUID } from 'crypto';
import { AuthService } from '../common/auth/auth.service';
import { SessionAlreadyAssignedException } from '../common/exception/errors';

@Injectable()
export class SandboxService {
    private readonly logger = new Logger(SandboxService.name);

    constructor(
        private readonly httpService: HttpService,
        private readonly cacheService: CacheService,
        @Inject(AuthService) private readonly authService: AuthService
    ) {}

    async getUserContainerImages(containerId: string) {
        const exec = await this.httpService.axiosRef.post(
            `http://127.0.0.1:2375/containers/${containerId}/exec`,
            {
                AttachStdin: false,
                AttachStdout: true,
                AttachStderr: true,
                DetachKeys: 'ctrl-p,ctrl-q',
                Tty: false,
                Cmd: ['sh', '-c', 'docker images --format json; docker ps --format json'],
            }
        );
        const imagesResponse = await this.httpService.axiosRef.post(
            `http://127.0.0.1:2375/exec/${exec.data.Id}/start`,
            {
                Detach: false,
                Tty: true,
                ConsoleSize: [80, 64],
            }
        );
        return imagesResponse.data;
    }

    async createContainer() {
        const requestBody = {
            Image: 'docker:dind',
            HostConfig: {
                Privileged: true,
            },
        };
        const { data } = await this.httpService.axiosRef.post(
            'http://223.130.135.14:2375/containers/create',
            requestBody
        );
        return data.Id;
    }

    async startContainer(containerId: string) {
        await this.httpService.axiosRef.post(
            `http://223.130.135.14:2375/containers/${containerId}/start`
        );
    }

    async assignContainer(sessionId?: string) {
        const isValidSession = this.authService.validateSession(sessionId);
        if (isValidSession) {
            throw new SessionAlreadyAssignedException();
        }

        const containerId = await this.createContainer();
        try {
            await this.startContainer(containerId);
        } catch (startError) {
            try {
                await this.deleteContainer(containerId);
            } catch (deleteError) {
                this.logger.error(deleteError);
            }
            throw startError;
        }

        const newSessionId = randomUUID();
        this.cacheService.set(newSessionId, { containerId, renew: false, startTime: new Date() });
        return newSessionId
    }

    async deleteContainer(containerId: string) {
        await this.httpService.axiosRef.delete(
            `http://223.130.135.14:2375/containers/${containerId}?force=true`
        );
    }

    async getContainers() {
        const { data } = await this.httpService.axiosRef.get('http://223.130.135.14:2375/containers/json?all=true');
        return data;
    }

    async clearContainers() {
        const containers = await this.getContainers();
        await Promise.all(containers.map((container: { Id: string }) => this.deleteContainer(container.Id)))
    }
}
