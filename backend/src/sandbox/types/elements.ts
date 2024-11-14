export type Container = {
    id: string;
    name: string;
    status: string;
    image: string;
};

export type Image = {
    id: string;
    name: string;
};

export type ContainerData = {
    Command: string;
    CreatedAt: string;
    ID: string;
    Image: string;
    Labels: string;
    LocalVolumes: string;
    Mounts: string;
    Names: string;
    Networks: string;
    Ports: string;
    RunningFor: string;
    Size: string;
    State: string;
    Status: string;
};

export type ImageData = {
    Containers: string;
    CreatedAt: string;
    CreatedSince: string;
    Digest: string;
    ID: string;
    Repository: string;
    SharedSize: string;
    Size: string;
    Tag: string;
    UniqueSize: string;
    VirtualSize: string;
};
