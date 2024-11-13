export type Quiz = {
    id: number;
    title: string;
    content: string;
};

export type Visualization = {
    containers: Container[];
    images: Image[];
};

export type Container = {
    id: string;
    imageId: string;
    status: string;
    name: string;
};

export type Image = {
    id: string;
    name: string;
};
