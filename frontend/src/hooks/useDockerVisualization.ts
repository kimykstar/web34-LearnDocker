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
        console.log('Not used color: ', notUsedColors);
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
        const { images: newImages } = data;

        setImages((currentImages) => {
            if (currentImages.length === newImages.length) {
                setAnimation((prev) => ({
                    isVisible: false,
                    key: prev.key,
                }));
                return currentImages;
            }

            const operation =
                currentImages.length < newImages.length
                    ? DOCKER_OPERATIONS.IMAGE_PULL
                    : DOCKER_OPERATIONS.IMAGE_DELETE;
            // container 명령어에 따른 처리 해야함

            const updatedImages = updateImageColors(newImages, currentImages);

            setPendingImages(updatedImages);
            setDockerOperation(operation);
            setAnimation((prev) => ({
                isVisible: true,
                key: prev.key + 1,
            }));

            return currentImages;
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
        // TODO: Container색상 지정 해야함
        setContainers(initContainers);
    };

    const handleAnimationComplete = () => {
        setImages(pendingImages);
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
