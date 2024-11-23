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

    const colors = ['#FF6B6B', '#FFC107', '#4CAF50', '#2196F3', '#673AB7', '#E91E63'];

    const getNotUsedColor = (images: Image[]) => {
        const notUsedColors = colors.filter((color) => {
            return !images.some((image) => image.color === color);
        });
        return notUsedColors[0];
    };

    //이전 Image상태를 가져와야 함..
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
    const updateContainerColors = (newContainers: Container[], newImages: Image[]) => {
        return newContainers.map((newContainer) => {
            if (!Object.keys(newContainer).includes('color')) {
                const matchedImage = newImages.find((image) => image.name === newContainer.image);
                return {
                    ...newContainer,
                    color: matchedImage?.color,
                };
            }
            return newContainer;
        });
    };

    const setColorToElements = (images: Image[], containers: Container[]) => {
        const initImages = images.map((image, index) => {
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
    const handleTerminalEnterCallback = (data: Visualization) => {
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
                return currentContainers;
            }

            const operation =
                currentContainers.length < newContainers.length
                    ? DOCKER_OPERATIONS.CONTAINER_CREATE
                    : DOCKER_OPERATIONS.CONTAINER_DELETE;
            let updatedContainers: Container[] = [];
            setImages((currentImages) => {
                updatedContainers = updateContainerColors(newContainers, currentImages);
                setPendingContainers(updatedContainers);
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

    const updateVisualizationData = async () => {
        const data = await requestVisualizationData(navigate);
        if (!data) return;
        handleTerminalEnterCallback(data);
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
            dockerOperation === DOCKER_OPERATIONS.CONTAINER_DELETE
        ) {
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
