import { Test, TestingModule } from '@nestjs/testing';
import { CbStatsController } from './cb-stats.controller';

describe('CbStatsController', () => {
  let controller: CbStatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CbStatsController],
    }).compile();

    controller = module.get<CbStatsController>(CbStatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
