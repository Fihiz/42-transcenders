import { Test, TestingModule } from '@nestjs/testing';
import { SbStatsService } from './sb-stats.service';

describe('SbStatsService', () => {
  let service: SbStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SbStatsService],
    }).compile();

    service = module.get<SbStatsService>(SbStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
