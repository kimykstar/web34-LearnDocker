import { HttpService } from '@nestjs/axios';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { parseStringToJson, filterContainerInfo, filterImageInfo } from './utils';
import { requestDockerCommand } from './exec.api';
import { ContainerData, ImageData } from './types/elements';
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
        const containers = await requestDockerCommand(this.httpService, containerId, [
            'docker',
            'ps',
            '-a',
            '--format',
            'json',
        ]);
        const images = await requestDockerCommand(this.httpService, containerId, [
            'docker',
            'images',
            '--format',
            'json',
        ]);
        return { containers: this.parseContainers(containers), images: this.parseImages(images) };
    }

    parseContainers(containers: string | object) {
        if (typeof containers === 'object') containers = JSON.stringify(containers);
        const containerList = parseStringToJson(containers) as ContainerData[];
        return filterContainerInfo(containerList);
    }

    parseImages(images: string | object) {
        if (typeof images === 'object') images = JSON.stringify(images);
        const imageList = parseStringToJson(images) as ImageData[];
        return filterImageInfo(imageList);
    }

    async processUserCommand(command: string, containerId: string) {
        return requestDockerCommand(this.httpService, containerId, command.split(' '));
    }

    async createContainer() {
        const requestBody = {
            Image: 'docker:dind',
            HostConfig: {
                Privileged: true,
            },
        };
        const { data } = await this.httpService.axiosRef.post(
            `${process.env.SANDBOX_URL}/containers/create`,
            requestBody
        );
        return data.Id;
    }

    async startContainer(containerId: string) {
        await this.httpService.axiosRef.post(
            `${process.env.SANDBOX_URL}/containers/${containerId}/start`
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
        return newSessionId;
    }

    async deleteContainer(containerId: string) {
        await this.httpService.axiosRef.delete(
            `${process.env.SANDBOX_URL}/containers/${containerId}?force=true`
        );
    }

    async getContainers() {
        const { data } = await this.httpService.axiosRef.get(
            `${process.env.SANDBOX_URL}/containers/json?all=true`
        );
        return data;
    }

    async clearContainers() {
        const containers = await this.getContainers();
        await Promise.all(
            containers.map((container: { Id: string }) => this.deleteContainer(container.Id))
        );
    }
}
