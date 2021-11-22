import { Test, TestingModule } from '@nestjs/testing';
import { CbUserController } from './cb-user.controller';

describe('CbUserController', () => {
  let controller: CbUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CbUserController],
    }).compile();

    controller = module.get<CbUserController>(CbUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
