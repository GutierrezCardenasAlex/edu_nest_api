// src/Modul_cursos/certificados/dto/create-certificado.dto.ts
import { IsUUID } from 'class-validator';

export class CreateCertificadoDto {
  @IsUUID()
  inscripcionId: string;
}