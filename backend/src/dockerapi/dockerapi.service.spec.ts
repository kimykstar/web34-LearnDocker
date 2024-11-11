import { Test, TestingModule } from '@nestjs/testing';
import { DockerapiService } from './dockerapi.service';

describe('DockerapiService', () => {
    let service: DockerapiService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DockerapiService],
        }).compile();

        service = module.get<DockerapiService>(DockerapiService);
    });

    it('ExecID is responded', async () => {
        const response = await service.getUserContainerImages('2378');
        expect(response).toBeDefined();
    });
});
