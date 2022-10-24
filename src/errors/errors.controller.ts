import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ErrorsService } from './errors.service';
import { CreateErrorDto } from './dto/create-error.dto';
import { UpdateErrorDto } from './dto/update-error.dto';

@Controller('errors')
export class ErrorsController {
  constructor(private readonly errorsService: ErrorsService) {}

  @Post()
  create(@Body() createErrorDto: CreateErrorDto) {
    return this.errorsService.create(createErrorDto);
  }

  @Get()
  findAll() {
    return this.errorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.errorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateErrorDto: UpdateErrorDto) {
    return this.errorsService.update(+id, updateErrorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.errorsService.remove(+id);
  }
}
