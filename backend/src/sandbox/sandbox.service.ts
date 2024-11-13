import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { parseStringToJson, filterContainerInfo, filterImageInfo } from './dataparse.utils';
import { requestDockerCommand } from './exec.api';

@Injectable()
export class SandboxService {
    constructor(private readonly httpService: HttpService) {}

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
        const containerList = parseStringToJson(containers);
        return filterContainerInfo(containerList);
    }

    parseImages(images: string | object) {
        if (typeof images === 'object') images = JSON.stringify(images);
        const imageList = parseStringToJson(images);
        return filterImageInfo(imageList);
    }

    async processUserCommand(command: string, containerId: string) {
        return requestDockerCommand(this.httpService, containerId, command.split(' '));
    }
}
