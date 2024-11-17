import { LucideIcon } from 'lucide-react';

export type Visualization = {
    containers: Container[];
    images: Image[];
};

export type Image = {
    id: string;
    name: string;
    color?: string;
};

export type Container = {
    id: string;
    name: string;
    imageId: string;
    // TODO: status는 나중에 type으로 지정해도 좋을 듯(백엔드랑 협의 필요)
    status: string;
    color?: string;
};

export type AnimationState = {
    isVisible: boolean;
    key: number;
};

export type NodeProps = {
    label: string;
    icon: LucideIcon;
    gridColumn: number;
    gridRow: number;
};

export type ContainerNodeProps = {
    label: string;
    icon: LucideIcon;
    gridColumn: number;
    gridRow: number;
    // TODO: containers undefined는 컨테이너 시각화 완료하면 삭제해야함
    containerData: Image[] | Container[] | undefined;
};

export type DockerVisualizationProps = {
    animationState: AnimationState;
    // TODO: containers undefined는 컨테이너 시각화 완료하면 삭제해야함
    containers: Container[] | undefined;
    images: Image[];
    dockerOperation: DockerOperation | undefined;
    onAnimationComplete: () => void;
};

export type ArrowProps = {
    icon: LucideIcon;
    className?: string;
    gridColumn: number;
    gridRow: number;
    isVisible?: boolean;
    onAnimationEnd?: () => void;
};

export type AnimationProps = {
    isVisible: boolean;
    onComplete: () => void;
    dockerOperation: DockerOperation | undefined;
};

export const DOCKER_OPERATIONS = {
    IMAGE_PULL: 'IMAGE_PULL',
    IMAGE_DELETE: 'IMEAGE_DELETE',
} as const;

export type DockerOperation = (typeof DOCKER_OPERATIONS)[keyof typeof DOCKER_OPERATIONS];
