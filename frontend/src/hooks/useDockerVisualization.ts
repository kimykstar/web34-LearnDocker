import { useState } from 'react';
import { requestVisualizationData } from '../api/quiz';
import { Image, DOCKER_OPERATIONS, AnimationState, DockerOperation } from '../types/visualization';
import { useNavigate } from 'react-router-dom';
import { Visualization } from '../types/visualization';

const useDockerVisualization = () => {
    const navigate = useNavigate();
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
                color: colors[index % colors.length],
            };
        });
    };

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

    const handleAnimationComplete = () => {
        setImages(pendingImages);
        setAnimation((prev) => ({
            isVisible: false,
            key: prev.key,
        }));
    };

    return {
        images,
        animation,
        dockerOperation,
        handleAnimationComplete,
        updateVisualizationData,
    };
};

export default useDockerVisualization;
