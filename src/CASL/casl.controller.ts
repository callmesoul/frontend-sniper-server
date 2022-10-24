import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaslService } from './casl.service';
import { CreateCaslDto } from './dto/create-casl.dto';
import { UpdateCaslDto } from './dto/update-casl.dto';

@Controller('casl')
export class CaslController {
  constructor(private readonly caslService: CaslService) {}

  @Post()
  create(@Body() createCaslDto: CreateCaslDto) {
    return this.caslService.create(createCaslDto);
  }

  @Get()
  findAll() {
    return this.caslService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caslService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaslDto: UpdateCaslDto) {
    return this.caslService.update(+id, updateCaslDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caslService.remove(+id);
  }
}
