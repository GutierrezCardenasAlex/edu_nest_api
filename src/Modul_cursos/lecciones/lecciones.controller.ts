// src/Modul_cursos/lecciones/lecciones.controller.ts
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LeccionesService } from './lecciones.service';
import { CreateLeccionDto } from './dto/create-leccion.dto';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { Roles } from '../../auth/decorator/roles.decorator';
import { Role } from '../../common/enums/rol.enum';

@Controller('lecciones')
@UseGuards(AuthGuard)
export class LeccionesController {
  constructor(private readonly service: LeccionesService) {}

  @Post()
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  crear(@Request() req, @Body() dto: CreateLeccionDto) {
    return this.service.crear(dto, req.user.id);
  }
}