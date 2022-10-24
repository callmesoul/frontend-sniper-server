import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { CaslModule } from './casl/casl.module';
import { ProjectsModule } from './projects/projects.module';
import { ErrorsModule } from './errors/errors.module';

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
      synchronize: false,
    }),
    AdminsModule,
    AuthModule,
    RolesModule,
    CaslModule,
    ProjectsModule,
    ErrorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
