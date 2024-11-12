import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SandboxService {
    constructor(private readonly httpService: HttpService) {}

    async getUserContainerImages(userPort: number) {
        const containerResponse = await this.httpService.axiosRef.get(
            `http://127.0.0.1:${userPort}/containers/json`
        );
        const imagesResponse = await this.httpService.axiosRef.get(
            `http://127.0.0.1:${userPort}/images/json`
        );
        return { containers: containerResponse.data, images: imagesResponse.data };
    }
}
