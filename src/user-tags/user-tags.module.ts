import { Module } from '@nestjs/common';
import { UserTagsService } from './user-tags.service';
import { UserTagsController } from './user-tags.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserTag } from './user-tags.model';
import { UserTagRecord } from '../user-tag-records/user-tag-records.model';

@Module({
  imports: [SequelizeModule.forFeature([UserTag, UserTagRecord])],
  controllers: [UserTagsController],
  providers: [UserTagsService],
})
export class UserTagsModule {}
