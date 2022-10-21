import { Module } from '@nestjs/common';
import { UserTagRecordsService } from './user-tag-records.service';
import { UserTagRecordsController } from './user-tag-records.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserTagRecord } from './user-tag-records.model';

@Module({
  imports: [SequelizeModule.forFeature([UserTagRecord])],
  controllers: [UserTagRecordsController],
  providers: [UserTagRecordsService],
})
export class UserTagRecordsModule {}
