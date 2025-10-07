import { IsNotEmpty, IsOptional, IsEnum, IsInt } from "class-validator";
import { TipoLeccion } from "../entities/leccion.entity";

export class CreateLeccionDto {
    @IsNotEmpty()
    temarioId: number;

    @IsNotEmpty()
    titulo: string;

    @IsOptional()
    descripcion?: string;

    @IsOptional()
    @IsEnum(TipoLeccion)
    tipo?: TipoLeccion;

    @IsOptional()
    urlRecurso?: string;    

    @IsOptional()
    archivo?: string;

    @IsOptional()
    @IsInt()
    duracion?: number;

    @IsOptional()
    @IsInt()
    orden?: number;
}