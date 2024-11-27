import { Module } from '@nestjs/common';
import { SandboxService } from './sandbox.service';
import { SandboxController } from './sandbox.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '../common/cache/cache.module';
import { RequestModule } from 'src/common/request/request.module';

@Module({
    imports: [
        HttpModule.register({
            timeout: 10000,
        }),
        CacheModule,
        RequestModule,
    ],
    providers: [SandboxService],
    controllers: [SandboxController],
    exports: [SandboxService],
})
export class SandboxModule {}
