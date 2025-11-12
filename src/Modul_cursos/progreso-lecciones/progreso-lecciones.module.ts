// src/Modul_cursos/progreso-lecciones/progreso-lecciones.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgresoLeccionesService } from './progreso-lecciones.service';
import { ProgresoLeccionesController } from './progreso-lecciones.controller';
import { ProgresoLeccion } from './entities/progreso-leccion.entity';
import { Inscripcion } from '../inscripciones/entities/inscripcion.entity';
import { Leccion } from '../lecciones/entities/leccion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProgresoLeccion, Inscripcion, Leccion]),
  ],
  controllers: [ProgresoLeccionesController],
  providers: [ProgresoLeccionesService],
  exports: [ProgresoLeccionesService],
})
export class ProgresoLeccionesModule {}