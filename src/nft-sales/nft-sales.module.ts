import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NftSaleRecord } from './nft-sale-record.mode';
import { NftSaleTask } from './nft-sale-task.model';
import { NftSale } from './nft-sale.model';
import { NftSalesController } from './nft-sales.controller';

@Module({
  imports: [SequelizeModule.forFeature([NftSale, NftSaleTask, NftSaleRecord])],
  controllers: [NftSalesController],
})
export class NftSalesModule {}
