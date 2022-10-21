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
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { v1 } from 'uuid';
import { addWhiteMetaId } from 'src/api/wxcore';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { query } from 'express';
import { UserTag } from '../user-tags/user-tags.model';

@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUserDto: any) {
    const user = await this.userModel.findOne({
      where: { metaId: createUserDto.metaId },
    });
    if (user) {
      throw new HttpException(
        `metaId:${createUserDto.metaId} 已存在`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await addWhiteMetaId(createUserDto.metaId);
      return await this.userModel.create({
        ...createUserDto,
        id: v1(),
      });
    }
  }

  @Post()
  async batchRegisterUsers(@Body() params: { count: number; tagId: string }) {
    //
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
    return this.userModel.findAndCountAll({
      where,
      limit: +query.pageSize,
      offset: (+query.page - 1) * +query.pageSize,
      include: [{ model: UserTag }],
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
