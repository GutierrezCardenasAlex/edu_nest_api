import { Controller, Get, Post, Body, Param, Patch, Put, Delete } from '@nestjs/common';
import { ProgresoLeccionesService } from './progreso-lecciones.service';
import { CreateProgresoLeccionDto } from './dto/create-progreso-leccion.dto';
import { UpdateProgresoLeccionDto } from './dto/update-progreso-leccion.dto';

@Controller('progreso-lecciones')
export class ProgresoLeccionesController {
  constructor(private readonly progresoService: ProgresoLeccionesService) {}

  @Post()
  create(@Body() dto: CreateProgresoLeccionDto) {
    return this.progresoService.create(dto);
  }

  @Get()
  findAll() {
    return this.progresoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progresoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProgresoLeccionDto) {
    return this.progresoService.update(+id, dto);
  }

  @Put(':id')
  updatePut(@Param('id') id: string, @Body() dto: UpdateProgresoLeccionDto) {
    return this.progresoService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progresoService.remove(+id);
  }
}
