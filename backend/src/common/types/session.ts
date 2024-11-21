export interface UserSession {
    containerId: string;
    containerPort: string;
    startTime: Date;
    renew: boolean;
    level: number;
}
