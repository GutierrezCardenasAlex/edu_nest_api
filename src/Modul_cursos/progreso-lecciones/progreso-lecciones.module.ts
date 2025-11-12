<<<<<<< HEAD
// src/Modul_cursos/progreso-lecciones/progreso-lecciones.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
=======
import { Module, forwardRef } from '@nestjs/common';
>>>>>>> origin/model_cursos
import { ProgresoLeccionesService } from './progreso-lecciones.service';
import { ProgresoLeccionesController } from './progreso-lecciones.controller';
import { ProgresoLeccion } from './entities/progreso-leccion.entity';
import { Inscripcion } from '../inscripciones/entities/inscripcion.entity';
import { Leccion } from '../lecciones/entities/leccion.entity';
import { InscripcionesModule } from '../inscripciones/inscripciones.module';


@Module({
<<<<<<< HEAD
  imports: [
    TypeOrmModule.forFeature([ProgresoLeccion, Inscripcion, Leccion]),
  ],
  controllers: [ProgresoLeccionesController],
  providers: [ProgresoLeccionesService],
  exports: [ProgresoLeccionesService],
})
export class ProgresoLeccionesModule {}
=======
  imports: [TypeOrmModule.forFeature([ProgresoLeccion, Inscripcion, Leccion]),
    forwardRef(() => InscripcionesModule),
],
  providers: [ProgresoLeccionesService],
  controllers: [ProgresoLeccionesController],
})  
export class ProgresoLeccionesModule {}
>>>>>>> origin/model_cursos
