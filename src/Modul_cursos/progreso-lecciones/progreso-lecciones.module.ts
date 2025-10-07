import { Module } from '@nestjs/common';
import { ProgresoLeccionesService } from './progreso-lecciones.service';
import { ProgresoLeccionesController } from './progreso-lecciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgresoLeccion } from './entities/progreso-leccion.entity';
import { Inscripcion } from '../inscripciones/entities/inscripcion.entity';
import { Leccion } from '../lecciones/entities/leccion.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ProgresoLeccion, Inscripcion, Leccion])],
  providers: [ProgresoLeccionesService],
  controllers: [ProgresoLeccionesController],
})
export class ProgresoLeccionesModule {}
