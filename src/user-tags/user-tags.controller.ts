import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserTagsService } from './user-tags.service';
import { CreateUserTagDto } from './dto/create-user-tag.dto';
import { UpdateUserTagDto } from './dto/update-user-tag.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserTag } from './user-tags.model';
import { User } from 'src/users/user.model';
import { UserTagRecord } from '../user-tag-records/user-tag-records.model';
import { v1 } from 'uuid';

@Controller('user-tags')
export class UserTagsController {
  constructor(
    @InjectModel(UserTag)
    private readonly userTagModel: typeof UserTag,
    @InjectModel(UserTagRecord)
    private readonly userTagRecordModel: typeof UserTagRecord,
    private readonly userTagsService: UserTagsService,
  ) {}

  @Post()
  async create(@Body() createUserTagDto: any) {
    const userTag = await this.userTagModel.findOne({
      where: {
        name: createUserTagDto.name,
      },
    });
    if (userTag) {
      throw new HttpException(
        `name:${createUserTagDto.name} 已存在`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return await this.userTagModel.create({
        ...createUserTagDto,
        id: v1(),
      });
    }
  }

  @Get()
  findAll(@Query() query?: any) {
    const _params = {
      page: 1,
      pageSize: 12,
    };
    query = {
      ..._params,
      ...query,
    };
    const where = query.where ? JSON.parse(query.where) : {};
    console.log(query);
    return this.userTagModel.findAndCountAll({
      where,
      limit: +query.pageSize,
      offset: (+query.page - 1) * +query.pageSize,
      include: [{ model: User }],
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserTagDto: UpdateUserTagDto) {
    return this.userTagsService.update(+id, updateUserTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTagsService.remove(+id);
  }
}
