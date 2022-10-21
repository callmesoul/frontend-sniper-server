import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserTagRecordsService } from './user-tag-records.service';
import { CreateUserTagRecordDto } from './dto/create-user-tag-record.dto';
import { UpdateUserTagRecordDto } from './dto/update-user-tag-record.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserTagRecord } from './user-tag-records.model';
import { v1 } from 'uuid';

@Controller('user-tag-records')
export class UserTagRecordsController {
  constructor(
    private readonly userTagRecordsService: UserTagRecordsService,
    @InjectModel(UserTagRecord)
    private readonly userTagRecordModel: typeof UserTagRecord,
  ) {}

  @Post()
  async create(@Body() createUserTagRecordDto: any) {
    console.log(createUserTagRecordDto);
    const record = await this.userTagRecordModel.findOne({
      where: createUserTagRecordDto,
    });
    if (record) {
      throw new HttpException(`已存在记录`, HttpStatus.BAD_REQUEST);
    } else {
      return await this.userTagRecordModel.create({
        ...createUserTagRecordDto,
        id: v1(),
      });
    }
  }

  @Get()
  findAll() {
    return this.userTagRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTagRecordsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserTagRecordDto: UpdateUserTagRecordDto,
  ) {
    return this.userTagRecordsService.update(+id, updateUserTagRecordDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userTagRecordModel.destroy({
      where: { id },
    });
  }
}
