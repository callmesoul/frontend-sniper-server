import { Injectable } from '@nestjs/common';
import { CreateUserTagDto } from './dto/create-user-tag.dto';
import { UpdateUserTagDto } from './dto/update-user-tag.dto';

@Injectable()
export class UserTagsService {
  create(createUserTagDto: CreateUserTagDto) {
    return 'This action adds a new userTag';
  }

  findAll() {
    return `This action returns all userTags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userTag`;
  }

  update(id: number, updateUserTagDto: UpdateUserTagDto) {
    return `This action updates a #${id} userTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTag`;
  }
}
