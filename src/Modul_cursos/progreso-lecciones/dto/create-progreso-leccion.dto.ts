import { IsNotEmpty, IsBoolean, IsOptional } from "class-validator";

export class CreateProgresoLeccionDto {
    @IsNotEmpty()
    inscripcionId: number;

    @IsNotEmpty()
    leccionId: number;

    @IsOptional()
    @IsBoolean()
    completado?: boolean;

}