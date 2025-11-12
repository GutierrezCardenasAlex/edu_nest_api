// src/Modul_cursos/progreso-lecciones/guards/progreso-access.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { InscripcionesService } from '../../inscripciones/inscripciones.service';

@Injectable()
export class ProgresoAccessGuard implements CanActivate {
  constructor(private readonly inscripcionesService: InscripcionesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user.id;
    const { inscripcionId } = req.body;

    if (!inscripcionId) {
      throw new ForbiddenException('inscripcionId requerido');
    }

    const tieneAcceso = await this.inscripcionesService.tieneAcceso(
      userId,
      inscripcionId,
    );

    if (!tieneAcceso) {
      throw new ForbiddenException('Acceso denegado: pago no aprobado');
    }

    return true;
  }
}