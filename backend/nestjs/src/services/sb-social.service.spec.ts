import { Test, TestingModule } from '@nestjs/testing';
import { SbSocialService } from './sb-social.service';

describe('SbSocialService', () => {
  let service: SbSocialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SbSocialService],
    }).compile();

    service = module.get<SbSocialService>(SbSocialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
