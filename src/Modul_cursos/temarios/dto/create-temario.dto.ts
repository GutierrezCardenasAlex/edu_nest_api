// src/Modul_cursos/temarios/dto/create-temario.dto.ts
import { IsString, IsInt, Min, IsUUID, IsOptional } from 'class-validator';

export class CreateTemarioDto {
  @IsString()
  titulo: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsInt()
  @Min(0)
  orden: number;

  @IsUUID()
  cursoId: string;
}