export function parseStringToJson(datas: string) {
    return datas.split('\n').reduce<Array<any>>((jsonDatas, line) => {
        if (line !== '') jsonDatas.push(JSON.parse(line));
        return jsonDatas;
    }, []);
}

export function filterContainerInfo(containers: Array<any>) {
    return containers.reduce((containerReducer, container) => {
        containerReducer.push({
            id: container.ID,
            name: container.Names,
            status: container.State,
            image: container.Image,
        });
        return containerReducer;
    }, []);
}

export function filterImageInfo(images: Array<any>) {
    return images.reduce((imageReducer, image) => {
        imageReducer.push({
            id: image.ID,
            name: image.Repository,
        });
        return imageReducer;
    }, []);
}
