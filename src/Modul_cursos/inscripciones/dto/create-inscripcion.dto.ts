import { IsNotEmpty, IsNumber, IsOptional, IsBoolean } from "class-validator";

export class CreateInscripcionDto {
    @IsNotEmpty()
    @IsNumber()
    cursoId: number;

    @IsNotEmpty()
    @IsNumber()
    usuarioId: number;

    @IsOptional()
    progreso?: number;

    @IsOptional()
    @IsBoolean()
    completado?: boolean;
    
}
