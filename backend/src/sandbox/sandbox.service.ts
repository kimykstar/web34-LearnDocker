import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
    parseStringToJson,
    sortElementsByCreatedAt,
    filterContainerInfo,
    filterImageInfo,
} from './dataparse.utils';

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
        let containerDatas = containers.data;
        if (typeof containerDatas === 'object') containerDatas = JSON.stringify(containerDatas);
        return containerDatas === '""' ? [] : this.parseContainers(containerDatas);
    }

    parseContainers(containers: string) {
        const containerList = parseStringToJson(containers);
        const sortedContainerList = sortElementsByCreatedAt(containerList);
        return filterContainerInfo(sortedContainerList);
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
        let imageDatas = images.data;
        if (typeof imageDatas === 'object') imageDatas = JSON.stringify(imageDatas);
        return imageDatas.length === 0 ? [] : this.parseImages(imageDatas);
    }

    parseImages(images: string) {
        const imageList = parseStringToJson(images);
        const sortedImages = sortElementsByCreatedAt(imageList);
        return filterImageInfo(sortedImages);
    }
}
