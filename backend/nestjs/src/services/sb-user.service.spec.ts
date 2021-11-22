import { Test, TestingModule } from '@nestjs/testing';
import { SbUserService } from './sb-user.service';

describe('SbUserService', () => {
  let service: SbUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SbUserService],
    }).compile();

    service = module.get<SbUserService>(SbUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
