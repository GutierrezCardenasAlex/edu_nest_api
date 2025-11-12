// src/Modul_cursos/certificados/dto/update-certificado.dto.ts
import { IsUUID, IsOptional, IsDateString } from 'class-validator';

export class UpdateCertificadoDto {
  @IsOptional()
  @IsUUID()
  inscripcionId?: string;

  @IsOptional()
  @IsDateString() // Acepta: "2025-11-11" o "2025-11-11T12:00:00"
  fechaEmision?: string;
}