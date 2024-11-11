import { Test, TestingModule } from '@nestjs/testing';
import { DockerapiController } from './dockerapi.controller';

describe('DockerapiController', () => {
  let controller: DockerapiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DockerapiController],
    }).compile();

    controller = module.get<DockerapiController>(DockerapiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
