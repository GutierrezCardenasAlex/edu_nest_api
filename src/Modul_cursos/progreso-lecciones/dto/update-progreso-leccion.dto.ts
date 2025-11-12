// src/Modul_cursos/progreso-lecciones/dto/update-progreso.dto.ts
import { PartialType } from '@nestjs/mapped-types';

import { IsBoolean } from 'class-validator';
import { CreateProgresoDto } from './create-progreso-leccion.dto';

export class UpdateProgresoDto extends PartialType(CreateProgresoDto) {
  @IsBoolean()
  completada: boolean;
}