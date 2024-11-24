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
    const colors = ['#000000', '#FFC107', '#4CAF50', '#2196F3', '#673AB7', '#E91E63'];

    const getNotUsedColor = (images: Image[]) => {
        const notUsedColors = colors.filter((color) => {
            return !images.some((image) => image.color === color);
        });
        return notUsedColors[0];
    };

    const updateImageColors = (newImages: Image[], prevImages: Image[]) => {
        return newImages.map((newImage) => {
            const prevImage = prevImages.find((img) => img.id === newImage.id);
            if (prevImage) {
                return prevImage;
            }
            return {
                ...newImage,
                color: getNotUsedColor(prevImages),
            };
        });
    };

    const setColorToElements = (images: Image[], containers: Container[]) => {
        const sortedImages = images.sort((a, b) => a.id.localeCompare(b.id));
        const initImages = sortedImages.map((image, index) => {
            return {
                ...image,
                color: colors[index % colors.length],
            };
        });

        const initContainers = containers.map((container) => {
            const image = initImages.find((image) => {
                return image.name === container.image;
            });
            return {
                ...container,
                color: image?.color,
            };
        });
        return { initImages, initContainers };
    };

    // callback function for updating image and container visualization
    const handleTerminalEnterCallback = (data: Visualization, command: string) => {
        const { images: newImages, containers: newContainers } = data;
        setImages((currentImages) => {
            if (currentImages.length === newImages.length) {
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
            if (currentContainers.length === newContainers.length) {
                if (isChangedContainerStatus(currentContainers, newContainers)) {
                    setDockerOperation(DOCKER_OPERATIONS.CONTAINER_STOP);
                    const elements = setColorToElements(newImages, newContainers);
                    setPendingContainers(elements.initContainers);
                    if (command.match(STATE_CHANGE_COMMAND_REGEX))
                        setAnimation((prev) => ({
                            isVisible: true,
                            key: prev.key + 1,
                        }));
                    else setContainers(elements.initContainers);
                }
                return currentContainers;
            }

            setImages((currentImages) => {
                let operation = null;
                if (
                    currentContainers.length < newContainers.length &&
                    currentImages.length < newImages.length
                )
                    operation = DOCKER_OPERATIONS.CONTAINER_RUN;
                else if (currentContainers.length < newContainers.length)
                    operation = DOCKER_OPERATIONS.CONTAINER_CREATE;
                else operation = DOCKER_OPERATIONS.CONTAINER_DELETE;

                const result = setColorToElements(newImages, newContainers);
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
        const result = prevContainers.reduce<Container[]>((reducer, prevContainer) => {
            const matchedContainer = currentContainers.find((currentContainer) => {
                return currentContainer.id === prevContainer.id;
            });
            if (!matchedContainer) {
                throw new Error('isChangedContainerStatue함수 undefind 에러');
            }
            if (matchedContainer.status !== prevContainer.status) {
                reducer.push(matchedContainer);
            }
            return reducer;
        }, []);
        return result.length > 0 ? true : false;
    };

    const updateVisualizationData = async (command: string) => {
        const data = await requestVisualizationData(navigate);
        if (!data) return;
        handleTerminalEnterCallback(data, command);
    };

    const setInitVisualization = async () => {
        const data = await requestVisualizationData(navigate);
        if (!data) return;

        const { initImages, initContainers } = setColorToElements(data.images, data.containers);
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
            dockerOperation === DOCKER_OPERATIONS.CONTAINER_STOP
        ) {
            setContainers(pendingContainers);
        }
        if (dockerOperation === DOCKER_OPERATIONS.CONTAINER_RUN) {
            setImages(() => {
                setTimeout(() => {
                    setContainers(pendingContainers);
                }, 0);
                return pendingImages;
            });
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
