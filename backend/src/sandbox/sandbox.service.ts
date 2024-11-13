import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { parseStringToJson, filterContainerInfo, filterImageInfo } from './dataparse.utils';

@Injectable()
export class SandboxService {
    constructor(private readonly httpService: HttpService) {}

    async getUserContainerImages(containerId: string) {
        const containers = await this.getContainerList(containerId);
        const images = await this.getImageList(containerId);
        return { containers, images };
    }

    async getContainerList(containerId: string) {
        const exec = await this.httpService.axiosRef.post(
            `http://127.0.0.1:2375/containers/${containerId}/exec`,
            {
                AttachStdin: false,
                AttachStdout: true,
                AttachStderr: true,
                Tty: false,
                Cmd: ['docker', 'ps', '-a', '--format', 'json'],
            }
        );
        const containers = await this.httpService.axiosRef.post(
            `http://127.0.0.1:2375/exec/${exec.data.Id}/start`,
            {
                Detach: false,
                Tty: true,
                ConsoleSize: [80, 64],
            }
        );
        const containerDatas = containers.data;
        return containerDatas === '""' ? [] : this.parseContainers(containerDatas);
    }

    parseContainers(containers: string | object) {
        if (typeof containers === 'object') containers = JSON.stringify(containers);
        const containerList = parseStringToJson(containers);
        return filterContainerInfo(containerList);
    }

    async getImageList(containerId: string) {
        const exec = await this.httpService.axiosRef.post(
            `http://127.0.0.1:2375/containers/${containerId}/exec`,
            {
                AttachStdin: false,
                AttachStdout: true,
                AttachStderr: true,
                DetachKeys: 'ctrl-p,ctrl-q',
                Tty: false,
                Cmd: ['docker', 'images', '--format', 'json'],
            }
        );
        const images = await this.httpService.axiosRef.post(
            `http://127.0.0.1:2375/exec/${exec.data.Id}/start`,
            {
                Detach: false,
                Tty: true,
                ConsoleSize: [80, 64],
            }
        );
        const imageDatas = images.data;
        return imageDatas.length === 0 ? [] : this.parseImages(imageDatas);
    }

    parseImages(images: string | object) {
        if (typeof images === 'object') images = JSON.stringify(images);
        const imageList = parseStringToJson(images);
        return filterImageInfo(imageList);
    }

    async processUserCommand(command: string, containerId: string) {
        const exec = await this.httpService.axiosRef.post(
            `http://127.0.0.1:2375/containers/${containerId}/exec`,
            {
                AttachStdin: false,
                AttachStdout: true,
                AttachStderr: true,
                Tty: false,
                Cmd: command.split(' '),
            }
        );
        const response = await this.httpService.axiosRef.post(
            `http://127.0.0.1:2375/exec/${exec.data.Id}/start`,
            {
                Detach: false,
                Tty: true,
                ConsoleSize: [80, 64],
            }
        );

        return response.data;
    }
}
