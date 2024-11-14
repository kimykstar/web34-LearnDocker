export type Quiz = {
    id: number;
    title: string;
    content: string | undefined;
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

export type QuizTextAreaProps = {
    updateVisualizationData: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};
