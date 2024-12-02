import { Controller, Get, Post, Body, Delete, Req, Res, UseGuards, Sse } from '@nestjs/common';
import { interval } from 'rxjs';
import { filter, mergeMap, take, timeout } from 'rxjs/operators';
import { SandboxService } from './sandbox.service';
import { CommandValidationPipe } from './pipes/command.pipe';
import { Request, Response } from 'express';
import { SESSION_DURATION } from '../common/constant';
import { HideInProduction } from '../common/decorator/hide-in-production.decorator';
import { AuthGuard } from '../common/auth/auth.guard';
import { AuthService } from '../common/auth/auth.service';
import { RequestWithSession } from '../common/types/request';
import { HOST_STATUS } from './constant';
import { SessionAlreadyAssignedException } from 'src/common/exception/errors';
import { getHashValueFromIP } from '../sandbox/utils';
import { RequestGuard } from 'src/common/request/request.guard';

@Controller('sandbox')
export class SandboxController {
    constructor(
        private readonly sandboxService: SandboxService,
        private readonly authService: AuthService
    ) {}

    @Get('elements')
    @UseGuards(AuthGuard)
    getUserContainersImages(@Req() req: RequestWithSession) {
        const { containerPort } = req.session;
        // return this.sandboxService.getUserContainerImages(containerId);
        return this.sandboxService.getUserContainerImagesV2(containerPort);
    }

    @Post('command')
    @UseGuards(AuthGuard, RequestGuard)
    processUserCommand(
        @Req() req: RequestWithSession,
        @Body('command', CommandValidationPipe) command: string
    ) {
        const { containerId } = req.session;
        return this.sandboxService.processUserCommand(command, containerId);
    }

    @Post('start')
    async assignContainer(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const sessionId = req.cookies['sid'];
        const ipAddress = req.ip as string;
        const hashedSessionID = getHashValueFromIP(ipAddress);
        try {
            this.authService.throwIfSessionIsValid(hashedSessionID, sessionId);
            const sessionData = await this.sandboxService.assignContainer(ipAddress);
            const startTime = sessionData?.startTime as Date;
            res.cookie('sid', sessionData?.sessionId, { httpOnly: true, maxAge: SESSION_DURATION });
            res.json({ endDate: new Date(startTime).getTime() + SESSION_DURATION });
        } catch (error) {
            if (error instanceof SessionAlreadyAssignedException) {
                res.cookie('sid', hashedSessionID, { httpOnly: true, maxAge: SESSION_DURATION });
                return;
            }
            throw error;
        }
    }

    @Get('hostStatus')
    @UseGuards(AuthGuard)
    getHostStatus(@Req() req: RequestWithSession) {
        const { containerPort } = req.session;
        return this.sandboxService.getHostStatus(containerPort);
    }

    @Sse('hostStatus/stream')
    @UseGuards(AuthGuard)
    streamHostStatus(@Req() req: RequestWithSession) {
        const { containerPort } = req.session;

        return interval(1000).pipe(
            mergeMap(async () => {
                const status = await this.sandboxService.getHostStatus(containerPort);
                return { data: status };
            }),
            filter((message) => message.data === HOST_STATUS.READY),
            take(1),
            timeout(30000)
        );
    }

    @Get('endDate')
    @UseGuards(AuthGuard)
    getMaxAge(@Req() req: RequestWithSession) {
        const { startTime } = req.session;
        const endDate = new Date(startTime.getTime() + SESSION_DURATION);
        return { endDate };
    }

    @Delete('release')
    @UseGuards(AuthGuard)
    releaseUserSession(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const sessionId = req.cookies['sid'];
        this.sandboxService.releaseUserSession(sessionId);
        res.clearCookie('sid');
    }

    // 개발용 API입니다. 배포 시 노출되면 안됩니다.
    @Delete('clear')
    @HideInProduction()
    async clearContainers() {
        await this.sandboxService.clearContainers();
    }
}
