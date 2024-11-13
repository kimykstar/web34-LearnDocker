import { LucideIcon } from 'lucide-react';

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
    containerData: Image[] | Container[];
};

export type SidebarSectionProps = {
    title: string;
    links: Array<{
        title: string;
        path: string;
    }>;
};

export type DockerPullVisualizationProps = {
    containers: Container[];
    images: Image[];
};
