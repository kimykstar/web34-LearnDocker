import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { getHashValueFromIP } from './utils';
import { requestDockerCommand } from './exec.api';
import { Container, Image } from './types/elements';
import { CacheService } from '../common/cache/cache.service';
import { formatAxiosError } from '../common/exception/axios-formatter';
import { isAxiosError } from 'axios';
import { HOST_STATUS } from './constant';
import { UserSession } from 'src/common/types/session';

@Injectable()
export class SandboxService {
    private readonly logger = new Logger(SandboxService.name);

    constructor(
        private readonly httpService: HttpService,
        private readonly cacheService: CacheService
    ) {}

    async getUserContainerImages(containerPort: string) {
        try {
            const imageResponse = await this.getUserImages(containerPort);
            const images = this.parseImages(imageResponse);

            const containerResponse = await this.getUserContainers(containerPort);
            const containers = this.parseContainers(containerResponse);
            return { images, containers };
        } catch (error) {
            if (isAxiosError(error)) {
                this.logger.error(formatAxiosError(error));
            }
            return { images: [], containers: [] };
        }
    }

    async getUserImages(containerPort: string) {
        const response = await this.httpService.axiosRef.get(
            `http://${process.env.SANDBOX_HOST}:${containerPort}/images/json`
        );
        return response.data;
    }

    async getUserContainers(containerPort: string) {
        const response = await this.httpService.axiosRef.get(
            `http://${process.env.SANDBOX_HOST}:${containerPort}/containers/json?all=true`
        );
        return response.data;
    }

    parseImages(imageData: Array<Record<string, any>>) {
        return imageData.reduce<Array<Image>>((imageReducer, image) => {
            imageReducer.push({
                id: image.Id,
                name: image.RepoTags[0].split(':')[0],
            });
            return imageReducer;
        }, []);
    }

    parseContainers(containerData: Array<Record<string, any>>) {
        return containerData.reduce<Array<Container>>((containerReducer, container) => {
            containerReducer.push({
                id: container.Id,
                name: container.Names[0].split('/')[1],
                image: container.Image,
                status: container.State,
            });
            return containerReducer;
        }, []);
    }

    async getHostStatus(containerPort: string) {
        try {
            await this.httpService.axiosRef.get(
                `http://${process.env.SANDBOX_HOST}:${containerPort}/_ping`
            );
            return HOST_STATUS.READY;
        } catch (error) {
            if (isAxiosError(error)) {
                return HOST_STATUS.STARTING;
            }
            throw error;
        }
    }

    async processUserCommand(command: string, containerId: string) {
        return requestDockerCommand(this.httpService, containerId, command.split(' '));
    }

    async createContainer() {
        const requestBody = {
            Image: 'dind',
            HostConfig: {
                Privileged: true,
                PortBindings: {
                    '2375/tcp': [
                        {
                            HostPort: '0',
                            HostIp: '0.0.0.0',
                        },
                    ],
                },
                ExtraHosts: ['learndocker.io:172.17.0.1'],
            },
            Env: ['DOCKER_TLS_CERTDIR='],
            Cmd: ['--tls=false'],
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
        return data.NetworkSettings.Ports['2375/tcp'][0].HostPort;
    }

    async startContainer(containerId: string) {
        return this.httpService.axiosRef.post(
            `${process.env.SANDBOX_URL}/containers/${containerId}/start`
        );
    }

    async assignContainer(ipAddress: string) {
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

        const newSessionId = getHashValueFromIP(ipAddress);
        this.cacheService.set(newSessionId, {
            sessionId: newSessionId,
            containerId,
            containerPort,
            renew: false,
            startTime: new Date(),
            level: 1,
            lastRequest: new Date(),
        });

        this.logger.log(
            `Container Assigned: ${containerId}\t Session: ${newSessionId} \t Port: ${containerPort}`
        );

        return this.cacheService.get(newSessionId);
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

    async releaseUserSession(sessionId: string) {
        const { containerId, containerPort } = this.cacheService.get(sessionId) as UserSession;

        await this.httpService.axiosRef.delete(
            `${process.env.SANDBOX_URL}/containers/${containerId}?force=true&v=true`
        );
        this.cacheService.delete(sessionId);

        this.logger.log(
            `Container Released: ${containerId}\t Session: ${sessionId} \t Port: ${containerPort}`
        );
    }
}
