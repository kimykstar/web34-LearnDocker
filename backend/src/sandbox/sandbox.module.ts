import { Module } from '@nestjs/common';
import { SandboxService } from './sandbox.service';
import { SandboxController } from './sandbox.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [SandboxService],
    controllers: [SandboxController],
})
export class SandboxModule {}
