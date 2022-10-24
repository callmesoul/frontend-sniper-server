import { Injectable } from '@nestjs/common';
import { CreateCaslDto } from './dto/create-casl.dto';
import { UpdateCaslDto } from './dto/update-casl.dto';

@Injectable()
export class CaslService {
  create(createCaslDto: CreateCaslDto) {
    return 'This action adds a new casl';
  }

  findAll() {
    return `This action returns all casl`;
  }

  findOne(id: number) {
    return `This action returns a #${id} casl`;
  }

  update(id: number, updateCaslDto: UpdateCaslDto) {
    return `This action updates a #${id} casl`;
  }

  remove(id: number) {
    return `This action removes a #${id} casl`;
  }
}
