import { Controller, Get, Post, Body, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { SandboxService } from './sandbox.service';
import { CommandValidationPipe } from './pipes/command.pipe';
import { Request, Response } from 'express';
import { SESSION_DURATION } from '../common/constant';
import { HideInProduction } from '../common/decorator/hide-in-production.decorator';
import { AuthGuard } from '../common/auth/auth.guard';
import { AuthService } from '../common/auth/auth.service';
import { RequestWithSession } from '../common/types/request';

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
    @UseGuards(AuthGuard)
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
        this.authService.throwIfSessionIsValid(sessionId);

        const newSessionId = await this.sandboxService.assignContainer();
        res.cookie('sid', newSessionId, { httpOnly: true, maxAge: SESSION_DURATION });
    }

    @Get('hostStatus')
    @UseGuards(AuthGuard)
    getHostStatus(@Req() req: RequestWithSession) {
        const { containerPort } = req.session;
        return this.sandboxService.getHostStatus(containerPort);
    }

    @Get('endDate')
    @UseGuards(AuthGuard)
    getMaxAge(@Req() req: RequestWithSession) {
        const { startTime } = req.session;
        const endDate = new Date(startTime.getTime() + SESSION_DURATION);
        return { endDate };
    }

    // 개발용 API입니다. 배포 시 노출되면 안됩니다.
    @Delete('clear')
    @HideInProduction()
    async clearContainers() {
        await this.sandboxService.clearContainers();
    }
}
