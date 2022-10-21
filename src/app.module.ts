import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { NftBuysModule } from './nft-buys/nft-buys.module';
import { NftSalesModule } from './nft-sales/nft-sales.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserTagsModule } from './user-tags/user-tags.module';
import { UserTagRecordsModule } from './user-tag-records/user-tag-records.module';
const fs = require('fs');
const path = require('path');
const databaseConfig = JSON.parse(
  fs.readFileSync(path.resolve('src/database', 'config.json')),
);
const env = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      ...databaseConfig[env],
      autoLoadModels: true,
      // synchronize: true,
    }),
    UsersModule,
    AdminsModule,
    NftBuysModule,
    NftSalesModule,
    AuthModule,
    UserTagsModule,
    UserTagRecordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
