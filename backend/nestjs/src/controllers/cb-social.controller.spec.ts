import { Test, TestingModule } from '@nestjs/testing';
import { CbSocialController } from './cb-social.controller';

describe('CbSocialController', () => {
  let controller: CbSocialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CbSocialController],
    }).compile();

    controller = module.get<CbSocialController>(CbSocialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
