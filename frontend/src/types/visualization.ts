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
    image: string;
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
    containerData: Image[] | Container[] | undefined;
};

export type DockerVisualizationProps = {
    animationState: AnimationState;
    elements: Visualization;
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
    CONTAINER_CREATE: 'CONTAINER_CREATE',
    CONTAINER_DELETE: 'CONTAINER_DELETE',
    CONTAINER_RUN: 'CONTAINER_RUN',
    CONTAINER_STATUS_CHANGED: 'CONTAINER_STATUS_CHANGED',
} as const;

export const DOCKER_CONTAINER_STATUS = {
    EXITED: 'exited',
    RUNNING: 'running',
    CREATED: 'created',
    PAUSED: 'paused',
    STOPPED: 'stopped',
    DEAD: 'dead',
    RESTARTING: 'restarting',
};

export type DockerOperation = (typeof DOCKER_OPERATIONS)[keyof typeof DOCKER_OPERATIONS];
