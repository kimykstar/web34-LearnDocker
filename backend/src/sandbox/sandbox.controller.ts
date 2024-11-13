import { Controller, Get, Post, Body } from '@nestjs/common';
import { SandboxService } from './sandbox.service';
import { CommandValidationPipe } from './pipes/command.pipe';

@Controller('sandbox')
export class SandboxController {
    constructor(private dockerApiService: SandboxService) {}
    @Get('elements')
    getUserContainersImages() {
        // 사용자 containerId를 Session테이블로 부터 가져와서 아래 함수 매개변수로 전달해야 합니다!
        return this.dockerApiService.getUserContainerImages(
            '13d33cb7b795a4d635f0b3bfd91d5809501876c874151a0fd4a32ad0d43a6da3'
        );
    }

    @Post('command')
    processUserCommand(@Body('command', CommandValidationPipe) command: string) {
        return this.dockerApiService.processUserCommand(
            command,
            '13d33cb7b795a4d635f0b3bfd91d5809501876c874151a0fd4a32ad0d43a6da3'
        );
    }
}
