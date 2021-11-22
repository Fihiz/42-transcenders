import { Test, TestingModule } from '@nestjs/testing';
import { SbGameService } from './sb-game.service';

describe('SbGameService', () => {
  let service: SbGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SbGameService],
    }).compile();

    service = module.get<SbGameService>(SbGameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
