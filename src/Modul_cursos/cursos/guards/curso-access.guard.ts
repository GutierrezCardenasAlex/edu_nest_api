import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { InscripcionesService } from '../../inscripciones/inscripciones.service';

@Injectable()
export class CursoAccessGuard implements CanActivate {
  constructor(private readonly inscripcionesService: InscripcionesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const cursoId = request.params.cursoId || request.body.cursoId;

    if (!cursoId) {
      throw new ForbiddenException('Curso no especificado');
    }

    const tieneAcceso = await this.inscripcionesService.tieneAcceso(userId, cursoId);

    if (!tieneAcceso) {
      throw new ForbiddenException('Debes inscribirte y tener pago aprobado para acceder');
    }

    return true;
  }
}