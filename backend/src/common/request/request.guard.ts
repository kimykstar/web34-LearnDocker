import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestIntervalException } from '../exception/errors';
@Injectable()
export class RequestGuard implements CanActivate {
    private readonly Logger = new Logger(RequestGuard.name);

    constructor(private readonly requestService: RequestService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        const sessionId = request.cookies?.['sid'];
        if (sessionId) {
            try {
                const result = this.requestService.validRequestInterval(sessionId);
                return result;
            } catch (error) {
                if (error instanceof RequestIntervalException) {
                    this.Logger.debug('Request Blocked');
                    throw new RequestIntervalException();
                }
            }
        }

        return false;
    }
}
