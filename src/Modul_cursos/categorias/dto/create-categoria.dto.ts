import { IsString, IsOptional, IsNumber } from "class-validator";

export class CreateCategoriaDto {
    @IsString()
    nombre: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsNumber()
    parent_id?: number;
}