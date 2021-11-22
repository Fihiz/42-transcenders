import { Test, TestingModule } from '@nestjs/testing';
import { CbChatController } from './cb-chat.controller';

describe('CbChatController', () => {
  let controller: CbChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CbChatController],
    }).compile();

    controller = module.get<CbChatController>(CbChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
