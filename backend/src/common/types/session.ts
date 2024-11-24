export interface UserSession {
    sessionId: string;
    containerId: string;
    containerPort: string;
    startTime: Date;
    renew: boolean;
    level: number;
}
