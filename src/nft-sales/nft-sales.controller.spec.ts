import { Test, TestingModule } from '@nestjs/testing';
import { NftSalesController } from './nft-sales.controller';

describe('NftSalesController', () => {
  let controller: NftSalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NftSalesController],
    }).compile();

    controller = module.get<NftSalesController>(NftSalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
