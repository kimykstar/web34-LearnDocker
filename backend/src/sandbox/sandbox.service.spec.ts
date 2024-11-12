import { Test, TestingModule } from '@nestjs/testing';
import { SandboxService } from './sandbox.service';

describe('Sandbox service', () => {
    let service: SandboxService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SandboxService],
        }).compile();

        service = module.get<SandboxService>(SandboxService);
    });

    it('Container and images are responded', async () => {
        service.getUserContainerImages('ddd');
    });
});
