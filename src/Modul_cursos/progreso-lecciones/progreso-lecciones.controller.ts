// src/Modul_cursos/progreso-lecciones/progreso-lecciones.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ProgresoLeccionesService } from './progreso-lecciones.service';
import { CreateProgresoDto } from './dto/create-progreso-leccion.dto';
import { UpdateProgresoDto } from './dto/update-progreso-leccion.dto';

@Controller('progreso-lecciones')
export class ProgresoLeccionesController {
  constructor(private readonly progresoService: ProgresoLeccionesService) {}

  @Post()
  create(@Body() createProgresoDto: CreateProgresoDto) {
    return this.progresoService.create(createProgresoDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.progresoService.findOne(id);
  }

  @Get()
  findByInscripcion(@Query('inscripcionId', ParseUUIDPipe) inscripcionId: string) {
    return this.progresoService.findByInscripcion(inscripcionId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProgresoDto: UpdateProgresoDto,
  ) {
    return this.progresoService.update(id, updateProgresoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.progresoService.remove(id);
  }
}