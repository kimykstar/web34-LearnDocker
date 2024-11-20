import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { parseStringToJson, filterContainerInfo, filterImageInfo } from './utils';
import { requestDockerCommand } from './exec.api';
import { ContainerData, ImageData } from './types/elements';
import { CacheService } from '../common/cache/cache.service';
import { randomUUID } from 'crypto';

@Injectable()
export class SandboxService {
    private readonly logger = new Logger(SandboxService.name);

    constructor(
        private readonly httpService: HttpService,
        private readonly cacheService: CacheService
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
                PortBindings: {
                    '2375/tcp': [
                        {
                            HostPort: '',
                            HostIp: '0.0.0.0',
                        },
                    ],
                },
            },
            Env: ['DOCKER_TLS_CERTDIR='],
        };
        const { data } = await this.httpService.axiosRef.post(
            `${process.env.SANDBOX_URL}/containers/create`,
            requestBody
        );
        return data.Id;
    }

    async getContainerPort(containerId: string) {
        const { data } = await this.httpService.axiosRef.get(
            `${process.env.SANDBOX_URL}/containers/${containerId}/json`
        );
        // TODO: 포트 정보가 없는 경우에 대한 처리
        return data.NetworkSettings.Ports['2375/tcp'][0].HostPort;
    }

    async startContainer(containerId: string) {
        return this.httpService.axiosRef.post(
            `${process.env.SANDBOX_URL}/containers/${containerId}/start`
        );
    }

    async assignContainer() {
        const containerId = await this.createContainer();
        let containerPort;

        try {
            await this.startContainer(containerId);
            containerPort = await this.getContainerPort(containerId);
        } catch (startError) {
            try {
                await this.deleteContainer(containerId);
            } catch (deleteError) {
                this.logger.error(deleteError);
            }
            throw startError;
        }

        const newSessionId = randomUUID();
        this.cacheService.set(newSessionId, {
            containerId,
            containerPort,
            renew: false,
            startTime: new Date(),
        });

        this.logger.log(
            `Container Assigned: ${containerId}\t Session: ${newSessionId} \t Port: ${containerPort}`
        );

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
