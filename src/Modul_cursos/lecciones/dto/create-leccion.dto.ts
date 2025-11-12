// src/Modul_cursos/lecciones/dto/create-leccion.dto.ts
import { IsString, IsInt, Min, IsUUID, IsOptional } from 'class-validator';

export class CreateLeccionDto {
  @IsString()
  titulo: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  video_url?: string;

  @IsInt()
  @Min(0)
  duracion_minutos: number;

  @IsInt()
  @Min(0)
  orden: number;

  @IsUUID()
  temarioId: string;
}