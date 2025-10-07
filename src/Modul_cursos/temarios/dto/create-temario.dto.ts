import { IsNotEmpty, IsInt, IsOptional } from "class-validator";

export class CreateTemarioDto {
    @IsNotEmpty()
    cursoId: number;

    @IsNotEmpty()
    titulo: string;

    @IsOptional()
    @IsInt()
    orden?: number;
}