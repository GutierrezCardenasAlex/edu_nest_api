import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { LeccionesService } from './lecciones.service';
import { CreateLeccionDto } from './dto/create-leccion.dto';
import { UpdateLeccionDto } from './dto/update-leccion.dto';

@Controller('lecciones')
export class LeccionesController {
    constructor(private readonly leccionesService: LeccionesService) {}

    @Post()
    create(@Body() dto: CreateLeccionDto) {
        return this.leccionesService.create(dto);
    }

    @Get()
    findAll() {
        return this.leccionesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.leccionesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateLeccionDto) {
        return this.leccionesService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.leccionesService.remove(+id);
    }
}
