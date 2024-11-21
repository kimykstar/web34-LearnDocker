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

    const updateImageColors = (newImages: Image[], prevImages: Image[]) => {
        const colors = ['#FF6B6B', '#FFC107', '#4CAF50', '#2196F3', '#673AB7', '#E91E63'];

        return newImages.map((newImage, index) => {
            const prevImage = prevImages.find((img) => img.id === newImage.id);
            if (prevImage) {
                return prevImage;
            }

            return {
                ...newImage,
                //TODO: 이미 동일한 색상의 이미지가 있으면 다음 색상을 부여하는 로직 필요
                color: colors[index % colors.length],
            };
        });
    };

    // callback function for updating image and container visualization
    const handleTerminalEnterCallback = (data: Visualization) => {
        const { images: newImages, containers: newContainers } = data;
        // TODO: container 애니매이션은 아직 안 만듬
        console.log(newContainers);
        if (images.length === newImages.length) {
            setAnimation((prev) => ({
                isVisible: false,
                key: prev.key,
            }));
            return;
        }

        const operation =
            images.length < newImages.length
                ? DOCKER_OPERATIONS.IMAGE_PULL
                : DOCKER_OPERATIONS.IMAGE_DELETE;

        const updatedImages = updateImageColors(newImages, images);
        setPendingImages(updatedImages);
        setAnimation((prev) => ({
            isVisible: true,
            key: prev.key + 1,
        }));

        setDockerOperation(operation);
    };

    const updateVisualizationData = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            const data = await requestVisualizationData(navigate);

            if (!data) {
                return;
            }

            handleTerminalEnterCallback(data);
        }
    };

    const setInitVisualization = async () => {
        const data = await requestVisualizationData(navigate);

        if (!data) return;

        setImages(data.images);
        setContainers(data.containers);
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
