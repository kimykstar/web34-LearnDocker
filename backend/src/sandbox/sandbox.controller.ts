import { Controller, Get } from '@nestjs/common';
import { SandboxService } from './sandbox.service';

@Controller('sandbox')
export class SandboxController {
    constructor(private dockerApiService: SandboxService) {}
    @Get('elements')
    getUserContainersImages() {
        // 사용자 Port를 Session테이블로 부터 가져와서 아래 함수 매개변수로 전달해야 합니다!
        return this.dockerApiService.getUserContainerImages(2378);
    }
}
