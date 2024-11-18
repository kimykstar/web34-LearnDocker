import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly Logger = new Logger(AuthGuard.name);

    constructor(private readonly authService: AuthService) {}

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const sessionId = request.cookies['sid'];
        this.Logger.debug(`Session ID: ${sessionId}`);

        const session = this.authService.validateSession(sessionId);

        request.session = session;

        return true;
    }
}
