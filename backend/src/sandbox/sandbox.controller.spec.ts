import { Test, TestingModule } from '@nestjs/testing';
import { SandboxController } from './sandbox.controller';

describe('SandboxController', () => {
    let controller: SandboxController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SandboxController],
        }).compile();

        controller = module.get<SandboxController>(SandboxController);
    });

    it('should be defined', () => {
        const response = controller.getUserContainersImages();
        console.log(response);
        expect(response).toBeDefined();
    });
});
