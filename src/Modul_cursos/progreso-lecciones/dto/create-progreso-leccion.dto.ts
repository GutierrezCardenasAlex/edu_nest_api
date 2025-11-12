// src/Modul_cursos/progreso-lecciones/dto/create-progreso.dto.ts
import { IsUUID, IsBoolean, IsOptional } from 'class-validator';

export class CreateProgresoDto {
  @IsUUID()
  inscripcionId: string;

  @IsUUID()
  leccionId: string;

  @IsBoolean()
  @IsOptional()
  completada?: boolean;
}