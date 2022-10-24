import { Module } from '@nestjs/common';
import { CaslService } from './casl.service';
import { CaslController } from './casl.controller';

@Module({
  controllers: [CaslController],
  providers: [CaslService]
})
export class CaslModule {}
