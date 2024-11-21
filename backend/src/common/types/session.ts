export interface ContainerSession {
    containerId: string;
    containerPort: string;
    startTime: Date;
    renew: boolean;
}
