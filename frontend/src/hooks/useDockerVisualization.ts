import { useState } from 'react';
import { requestVisualizationData } from '../api/quiz';
import {
    Image,
    DOCKER_OPERATIONS,
    AnimationState,
    DockerOperation,
    Container,
} from '../types/visualization';
import { useNavigate } from 'react-router-dom';
import { Visualization } from '../types/visualization';

const useDockerVisualization = () => {
    const navigate = useNavigate();
    const [containers, setContainers] = useState<Container[]>([]);
    const [images, setImages] = useState<Image[]>([]);
    const [pendingImages, setPendingImages] = useState<Image[]>([]);
    const [pendingContainers, setPendingContainers] = useState<Container[]>([]);
    const [dockerOperation, setDockerOperation] = useState<DockerOperation>();
    const [animation, setAnimation] = useState<AnimationState>({
        isVisible: false,
        key: 0,
    });
    const STATE_CHANGE_COMMAND_REGEX =
        /^docker\s+(run|create|start|stop|pull|rmi|rm|restart|pause|unpause|rename|attach|tag|build|load|commit|kill)(\s|$)/;
    const DOCKER_RUN_COMMAND_WITHOUT_IMAGE = /docker\s+run(\s|$)/;
    const colors = ['#000000', '#FFC107', '#4CAF50', '#2196F3', '#673AB7', '#E91E63'];

    const getNotUsedColor = (images: Image[]) => {
        const notUsedColors = colors.filter((color) => {
            return !images.some((image) => image.color === color);
        });
        return notUsedColors[0];
    };

    const setColorToElements = (prevImages: Image[], images: Image[], containers: Container[]) => {
        const initImages = updateImageColors(images, prevImages);
        const initContainers = updateContainerColors(initImages, containers);

        return { initImages, initContainers };
    };

    const updateImageColors = (newImages: Image[], prevImages: Image[]) => {
        return newImages.map((newImage) => {
            const prevImage = prevImages.find((img) => img.id === newImage.id);
            if (prevImage && Object.keys(prevImage).includes('color')) {
                return prevImage;
            }
            const newData = {
                ...newImage,
                color: getNotUsedColor(prevImages),
            };
            prevImages.push(newData);
            return newData;
        });
    };

    const updateContainerColors = (coloredImages: Image[], containers: Container[]) => {
        return containers.map((container) => {
            const image = coloredImages.find((image) => {
                return image.name === container.image;
            });
            return {
                ...container,
                color: image?.color,
            };
        });
    };
    // callback function for updating image and container visualization
    const handleTerminalEnterCallback = (data: Visualization, command: string) => {
        const { images: newImages, containers: newContainers } = data;
        setImages((currentImages) => {
            if (
                currentImages.length === newImages.length ||
                command.match(DOCKER_RUN_COMMAND_WITHOUT_IMAGE)
            ) {
                return currentImages;
            }
            const operation =
                currentImages.length < newImages.length
                    ? DOCKER_OPERATIONS.IMAGE_PULL
                    : DOCKER_OPERATIONS.IMAGE_DELETE;

            const updatedImages = updateImageColors(newImages, currentImages);

            setPendingImages(updatedImages);
            setDockerOperation(operation);
            setAnimation((prev) => ({
                isVisible: true,
                key: prev.key + 1,
            }));
            return currentImages;
        });

        setContainers((currentContainers) => {
            setImages((currentImages) => {
                if (currentContainers.length === newContainers.length) {
                    if (isChangedContainerStatus(currentContainers, newContainers)) {
                        setDockerOperation(DOCKER_OPERATIONS.CONTAINER_STATUS_CHANGED);
                        const coloredContainers = updateContainerColors(
                            currentImages,
                            newContainers
                        );
                        setPendingContainers(coloredContainers);
                        if (command.match(STATE_CHANGE_COMMAND_REGEX))
                            setAnimation((prev) => ({
                                isVisible: true,
                                key: prev.key + 1,
                            }));
                        else setContainers(coloredContainers);
                    }
                    return currentImages;
                }
                let operation = null;
                if (
                    currentContainers.length < newContainers.length &&
                    currentImages.length < newImages.length
                ) {
                    const elements = setColorToElements(currentImages, newImages, newContainers);
                    operation = DOCKER_OPERATIONS.CONTAINER_RUN;
                    setPendingImages(elements.initImages);
                } else if (currentContainers.length < newContainers.length)
                    operation = DOCKER_OPERATIONS.CONTAINER_CREATE;
                else operation = DOCKER_OPERATIONS.CONTAINER_DELETE;
                const result = setColorToElements(currentImages, newImages, newContainers);
                setPendingContainers(result.initContainers);
                setDockerOperation(operation);
                setAnimation((prev) => ({
                    isVisible: true,
                    key: prev.key + 1,
                }));
                return currentImages;
            });

            return currentContainers;
        });
    };

    const isChangedContainerStatus = (
        prevContainers: Container[],
        currentContainers: Container[]
    ) => {
        return prevContainers.some((prevContainer) => {
            const matchedContainer = currentContainers.find(
                (currentContainer) => currentContainer.id === prevContainer.id
            );
            if (!matchedContainer) {
                throw new Error('isChangedContainerStatus함수 undefined 에러');
            }
            return matchedContainer.status !== prevContainer.status;
        });
    };
    const updateVisualizationData = async (command: string) => {
        const data = await requestVisualizationData(navigate);
        if (!data) return;
        handleTerminalEnterCallback(data, command);
    };

    const setInitVisualization = async () => {
        const data = await requestVisualizationData(navigate);
        if (!data) return;

        const { initImages, initContainers } = setColorToElements([], data.images, data.containers);
        setImages(initImages);
        setContainers(initContainers);
    };

    const handleAnimationComplete = () => {
        if (
            dockerOperation === DOCKER_OPERATIONS.IMAGE_PULL ||
            dockerOperation === DOCKER_OPERATIONS.IMAGE_DELETE
        )
            setImages(pendingImages);
        if (
            dockerOperation === DOCKER_OPERATIONS.CONTAINER_CREATE ||
            dockerOperation === DOCKER_OPERATIONS.CONTAINER_DELETE ||
            dockerOperation === DOCKER_OPERATIONS.CONTAINER_STATUS_CHANGED
        ) {
            setContainers(pendingContainers);
        }
        if (dockerOperation === DOCKER_OPERATIONS.CONTAINER_RUN) {
            setImages(pendingImages);
            setContainers(pendingContainers);
        }
        setAnimation((prev) => ({
            isVisible: false,
            key: prev.key,
        }));
    };

    return {
        images,
        containers,
        animation,
        dockerOperation,
        handleAnimationComplete,
        updateVisualizationData,
        setInitVisualization,
    };
};

export default useDockerVisualization;
