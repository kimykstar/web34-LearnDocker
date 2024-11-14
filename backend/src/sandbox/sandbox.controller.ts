import { Controller, Get, Post, Body, Delete, Req, Res } from '@nestjs/common';
import { SandboxService } from './sandbox.service';
import { CommandValidationPipe } from './pipes/command.pipe';
import { Request, Response } from 'express';
import { SESSION_DURATION } from '../common/constant';
import { HideInProduction } from '../common/decorator/hide-in-prod.decorator';

@Controller('sandbox')
export class SandboxController {
    constructor(private sandboxService: SandboxService) {}
  
    @Get('elements')
    getUserContainersImages() {
        // 사용자 containerId를 Session테이블로 부터 가져와서 아래 함수 매개변수로 전달해야 합니다!
        return this.sandboxService.getUserContainerImages(
            '13d33cb7b795a4d635f0b3bfd91d5809501876c874151a0fd4a32ad0d43a6da3'
        );
    }

    @Post('command')
    processUserCommand(@Body('command', CommandValidationPipe) command: string) {
        return this.sandboxService.processUserCommand(
            command,
            '13d33cb7b795a4d635f0b3bfd91d5809501876c874151a0fd4a32ad0d43a6da3'
        );
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
