import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TemariosService } from './temarios.service';
import { CreateTemarioDto } from './dto/create-temario.dto';
import { UpdateTemarioDto } from './dto/update-temario.dto';

@Controller('temarios')
export class TemariosController {
  constructor(private readonly temariosService: TemariosService) {}

  @Post()
  create(@Body() dto: CreateTemarioDto) {
    return this.temariosService.create(dto);
  }

  @Get()
  findAll() {
    return this.temariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.temariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTemarioDto) {
    return this.temariosService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.temariosService.remove(+id);
  }
}
