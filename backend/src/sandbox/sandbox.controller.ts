import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { SandboxService } from './sandbox.service';
import { CommandValidationPipe } from './pipes/command.pipe';

@Controller('sandbox')
export class SandboxController {
    constructor(private sandboxService: SandboxService) {}

    @Get('elements')
    getUserContainersImages() {
        // 사용자 containerId를 Session테이블로 부터 가져와서 아래 함수 매개변수로 전달해야 합니다!
        return this.sandboxService.getUserContainerImages(
            'bde1c594b704742839a56d91f9b018ebecf04f4102b67fc11e30539fa172015d'
        );
    }

    @Post('command')
    processUserCommand(@Body('command', CommandValidationPipe) command: string) {
        console.log(command);
        return command;
    }

    @Post('start')
    async assignContainer() {
        const containerId = await this.sandboxService.createContainer();
        await this.sandboxService.startContainer(containerId);
    }

    // 개발용 API입니다. 배포 시 노출되면 안됩니다.
    @Delete('clear')
    async clearContainers() {
        await this.sandboxService.clearContainers();
    }
}
