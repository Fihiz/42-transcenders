import { Test, TestingModule } from '@nestjs/testing';
import { SbChatService } from './sb-chat.service';

describe('SbChatService', () => {
  let service: SbChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SbChatService],
    }).compile();

    service = module.get<SbChatService>(SbChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
