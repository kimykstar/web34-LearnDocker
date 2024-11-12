import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SandboxService {
    constructor(private readonly httpService: HttpService) {}

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
}
