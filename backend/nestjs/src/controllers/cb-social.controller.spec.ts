import { Test, TestingModule } from '@nestjs/testing';
import { SocialController } from './cb-social.controller';

describe('SocialController', () => {
  let controller: SocialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialController],
    }).compile();

    controller = module.get<SocialController>(SocialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
