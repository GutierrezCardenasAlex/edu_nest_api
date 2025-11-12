import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/common/enums/rol.enum';


@Controller('inscripciones')
@UseGuards(AuthGuard)
export class InscripcionesController {
  constructor(private readonly service: InscripcionesService) {}

  @Post()
  @Roles(Role.USER)
  inscribirse(@Request() req, @Body() dto: CreateInscripcionDto) {
    return this.service.crearInscripcion(req.user.id, dto);
  }
}