import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DockerapiService {
    async getUserContainerImages(userPort: string) {
        const containerResponse = await axios.get(`http://127.0.0.1:${userPort}/containers/json`);
        const imagesResponse = await axios.get(`http://127.0.0.1:${userPort}/containers/json`);
        return { containers: [...containerResponse.data], images: [...imagesResponse.data] };
    }
}
