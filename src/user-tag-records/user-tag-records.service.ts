import { Injectable } from '@nestjs/common';
import { CreateUserTagRecordDto } from './dto/create-user-tag-record.dto';
import { UpdateUserTagRecordDto } from './dto/update-user-tag-record.dto';

@Injectable()
export class UserTagRecordsService {
  create(createUserTagRecordDto: CreateUserTagRecordDto) {
    return 'This action adds a new userTagRecord';
  }

  findAll() {
    return `This action returns all userTagRecords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userTagRecord`;
  }

  update(id: number, updateUserTagRecordDto: UpdateUserTagRecordDto) {
    return `This action updates a #${id} userTagRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTagRecord`;
  }
}
