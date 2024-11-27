import { Image, Container, ImageData, ContainerData } from './types/elements';
import crypto from 'crypto';

export function parseStringToJson(datas: string) {
    return datas.split('\n').reduce<Array<ImageData | ContainerData>>((jsonDatas, line) => {
        if (line !== '') jsonDatas.push(JSON.parse(line));
        return jsonDatas;
    }, []);
}

export function filterContainerInfo(containers: Array<ContainerData>) {
    return containers.reduce<Array<Container>>((containerReducer, container) => {
        containerReducer.push({
            id: container.ID,
            name: container.Names,
            status: container.State,
            image: container.Image,
        });
        return containerReducer;
    }, []);
}

export function filterImageInfo(images: Array<ImageData>) {
    return images.reduce<Array<Image>>((imageReducer, image) => {
        imageReducer.push({
            id: image.ID,
            name: image.Repository,
        });
        return imageReducer;
    }, []);
}

export function getHashValueFromIP(ipAddress: string) {
    return crypto.createHash('sha256').update(ipAddress).digest('hex');
}
