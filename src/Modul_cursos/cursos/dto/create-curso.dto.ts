import { IsString, IsOptional, IsBoolean, IsEnum, IsNumber } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  imagen_portada?: string;

  @IsOptional()
  @IsNumber()
  categoria_id?: number;

  @IsOptional()
  @IsNumber()
  subcategoria_id?: number;

  @IsNumber()
  docente_id: number;

  @IsOptional()
  @IsNumber()
  precio?: number;

  @IsOptional()
  @IsBoolean()
  es_gratuito?: boolean;

  @IsOptional()
  @IsEnum(['Principiante', 'Intermedio', 'Avanzado'])
  nivel?: 'Principiante' | 'Intermedio' | 'Avanzado';

  @IsOptional()
  @IsEnum(['Borrador', 'Publicado', 'Inactivo'])
  estado?: 'Borrador' | 'Publicado' | 'Inactivo';
}
