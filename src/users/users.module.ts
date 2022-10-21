import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserTagRecord } from '../user-tag-records/user-tag-records.model';

@Module({
  imports: [SequelizeModule.forFeature([User, UserTagRecord])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
