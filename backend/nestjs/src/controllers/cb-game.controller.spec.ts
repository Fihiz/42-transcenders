import { Test, TestingModule } from '@nestjs/testing';
import { CbGameController } from './cb-game.controller';

describe('CbGameController', () => {
  let controller: CbGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CbGameController],
    }).compile();

    controller = module.get<CbGameController>(CbGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
