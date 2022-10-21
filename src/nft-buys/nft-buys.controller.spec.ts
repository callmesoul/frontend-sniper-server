import { Test, TestingModule } from '@nestjs/testing';
import { NftBuysController } from './nft-buys.controller';

describe('NftBuysController', () => {
  let controller: NftBuysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NftBuysController],
    }).compile();

    controller = module.get<NftBuysController>(NftBuysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
