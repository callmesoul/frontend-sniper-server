import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NftBuyRecord } from './nft-buy-record.model';
import { NftBuyTask } from './nft-buy-task.model';
import { NftBuy } from './nft-buy.model';
import { NftBuysController } from './nft-buys.controller';

@Module({
  imports: [SequelizeModule.forFeature([NftBuy, NftBuyTask, NftBuyRecord])],
  controllers: [NftBuysController],
})
export class NftBuysModule {}
