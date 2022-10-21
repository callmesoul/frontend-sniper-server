import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin.model';
import { AdminsController } from './admins.controller';

@Module({
  imports: [SequelizeModule.forFeature([Admin])],
  controllers: [AdminsController],
})
export class AdminsModule {}
