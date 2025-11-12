// src/Modul_cursos/temarios/temarios.controller.ts
import { Body, Controller, Post, UseGuards, Request, Get, Param } from '@nestjs/common';
import { TemariosService } from './temarios.service';
import { CreateTemarioDto } from './dto/create-temario.dto';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { Roles } from '../../auth/decorator/roles.decorator';
import { Role } from '../../common/enums/rol.enum';

@Controller('temarios')
@UseGuards(AuthGuard, RolesGuard)
export class TemariosController {
  constructor(private readonly service: TemariosService) {}

  @Post()
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  crear(@Request() req, @Body() dto: CreateTemarioDto) {
    return this.service.crear(dto, req.user.id);
  }

  @Get('curso/:cursoId')
  porCurso(@Param('cursoId') cursoId: string) {
    return this.service.findByCurso(cursoId);
  }
}