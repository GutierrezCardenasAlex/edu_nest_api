import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCertificadoDto {
    @IsNotEmpty()
    inscripcionId: number;

    @IsOptional()
    @IsString()
    codigo_certificado?: string;

    @IsOptional()
    @IsString()
    url_pdf?: string;
}