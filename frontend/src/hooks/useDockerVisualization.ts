import { useRef, useState } from 'react';
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
    const imagesRef = useRef<Image[]>();
    const containersRef = useRef<Container[]>();
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

    const handleTerminalEnterCallback = (data: Visualization, command: string) => {
        const { images: newImages, containers: newContainers } = data;
        const prevImages = imagesRef.current as Image[];
        const prevContainers = containersRef.current as Container[];
        console.log(command);
        // image Pull
        if (
            newImages.length > prevImages.length &&
            newContainers.length === prevContainers.length
        ) {
            const updatedImages = updateImageColors(newImages, prevImages);

            imagesRef.current = [...updatedImages];
            setPendingImages(updatedImages);
            setDockerOperation(DOCKER_OPERATIONS.IMAGE_PULL);
            setAnimation((prev) => ({
                isVisible: true,
                key: prev.key + 1,
            }));
        } else if (newImages.length < prevImages.length) {
            // docker rmi
            const updatedImages = updateImageColors(newImages, prevImages);

            imagesRef.current = [...updatedImages];
            setPendingImages(updatedImages);
            setDockerOperation(DOCKER_OPERATIONS.IMAGE_DELETE);
            setAnimation((prev) => ({
                isVisible: true,
                key: prev.key + 1,
            }));
        } else if (
            prevImages.length === newImages.length &&
            prevContainers.length < newContainers.length
        ) {
            // docker run의 경우(이미지가 있을 때)
            const updatedContainers = updateContainerColors(prevImages, newContainers);

            containersRef.current = [...updatedContainers];
            setPendingContainers(updatedContainers);
            setDockerOperation(DOCKER_OPERATIONS.CONTAINER_CREATE);
            setAnimation((prev) => ({
                isVisible: true,
                key: prev.key + 1,
            }));
        } else if (
            // docker run (이미지가 없을 때)
            prevImages.length < newImages.length &&
            prevContainers.length < newContainers.length
        ) {
            const { initImages, initContainers } = setColorToElements(
                prevImages,
                newImages,
                newContainers
            );

            imagesRef.current = [...initImages];
            containersRef.current = [...initContainers];
            setPendingImages(initImages);
            setPendingContainers(initContainers);
            setDockerOperation(DOCKER_OPERATIONS.CONTAINER_RUN);
            setAnimation((prev) => ({
                isVisible: true,
                key: prev.key + 1,
            }));
        } else if (prevContainers.length > newContainers.length) {
            // docker rm의 경우
            const updatedContainers = updateContainerColors(prevImages, newContainers);

            containersRef.current = [...updatedContainers];
            setPendingContainers(updatedContainers);
            setDockerOperation(DOCKER_OPERATIONS.CONTAINER_DELETE);
            setAnimation((prev) => ({
                isVisible: true,
                key: prev.key + 1,
            }));
        } else if (isChangedContainerStatus(prevContainers, newContainers)) {
            const updatedContainers = updateContainerColors(prevImages, newContainers);
            containersRef.current = [...updatedContainers];
            setPendingContainers(updatedContainers);
            setDockerOperation(DOCKER_OPERATIONS.CONTAINER_STATUS_CHANGED);
            if (command.match(STATE_CHANGE_COMMAND_REGEX))
                setAnimation((prev) => ({
                    isVisible: true,
                    key: prev.key + 1,
                }));
            else setContainers(updatedContainers);
        }
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
        imagesRef.current = [...initImages];
        containersRef.current = [...initContainers];
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
        handleTerminalEnterCallback,
        setInitVisualization,
    };
};

export default useDockerVisualization;
