import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { RequestService } from './request.service';

@Injectable()
export class RequestGuard implements CanActivate {
    private readonly Logger = new Logger(RequestGuard.name);

    constructor(private readonly requestService: RequestService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        const sessionId = request.cookies?.['sid'];
        if (sessionId) {
            const result = this.requestService.validRequestInterval(sessionId);
            if (!result) {
                this.Logger.debug('Request blocked');
            }
            return result;
        }

        this.Logger.debug('Request blocked: Missing session ID in cookies');
        return false;
    }
}
