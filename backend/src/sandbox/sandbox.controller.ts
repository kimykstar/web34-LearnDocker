import { Controller, Get, Post, Body, Delete, Req, Res } from '@nestjs/common';
import { SandboxService } from './sandbox.service';
import { CommandValidationPipe } from './pipes/command.pipe';
import { Request, Response } from 'express';
import { SESSION_DURATION } from '../common/constant';
import { HideInProduction } from '../common/decorator/hide-in-production.decorator';

@Controller('sandbox')
export class SandboxController {
    constructor(private sandboxService: SandboxService) {}

    @Get('elements')
    getUserContainersImages(@Req() req: Request) {
        const sessionId = req.cookies['sid'];
        return this.sandboxService.getUserContainerImages(sessionId);
    }

    @Post('command')
    processUserCommand(
        @Req() req: Request,
        @Body('command', CommandValidationPipe) command: string
    ) {
        const sessionId = req.cookies['sid'];
        return this.sandboxService.processUserCommand(command, sessionId);
    }

    @Post('start')
    async assignContainer(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const sessionId = req.cookies['sid'];
        const newSessionId = await this.sandboxService.assignContainer(sessionId);
        res.cookie('sid', newSessionId, { httpOnly: true, maxAge: SESSION_DURATION });
    }

    // 개발용 API입니다. 배포 시 노출되면 안됩니다.
    @Delete('clear')
    @HideInProduction()
    async clearContainers() {
        await this.sandboxService.clearContainers();
    }
}
