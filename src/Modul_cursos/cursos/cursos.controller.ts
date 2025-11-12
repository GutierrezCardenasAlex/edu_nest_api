import { Controller, Get, Post, Body, Patch, Put, Param, Delete } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Controller('cursos')
export class CursosController {
    constructor(private readonly cursosService: CursosService) {}

    @Post()
    create(@Body() dto: CreateCursoDto) {
        return this.cursosService.create(dto);
    }

    @Get()
    findAll() {
        return this.cursosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.cursosService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateCursoDto) {
        return this.cursosService.update(+id, dto);
    }

    @Put(':id')
    updatePut(@Param('id') id: string, @Body() dto: UpdateCursoDto) {
        return this.cursosService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.cursosService.remove(+id);
    }
}
