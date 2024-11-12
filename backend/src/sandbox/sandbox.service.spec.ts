import { Test, TestingModule } from '@nestjs/testing';
import { SandboxService } from './sandbox.service';

describe('DockerapiService', () => {
    let service: SandboxService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SandboxService],
        }).compile();

        service = module.get<SandboxService>(SandboxService);
    });

    it('ExecID is responded', async () => {
        const response = await service.getUserContainerImages(2378);
        expect(response).toBeDefined();
    });
});
