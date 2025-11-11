import { Module, forwardRef } from '@nestjs/common';
import { ProgresoLeccionesService } from './progreso-lecciones.service';
import { ProgresoLeccionesController } from './progreso-lecciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgresoLeccion } from './entities/progreso-leccion.entity';
import { Inscripcion } from '../inscripciones/entities/inscripcion.entity';
import { Leccion } from '../lecciones/entities/leccion.entity';
import { InscripcionesModule } from '../inscripciones/inscripciones.module';



@Module({
  imports: [TypeOrmModule.forFeature([ProgresoLeccion, Inscripcion, Leccion]),
    forwardRef(() => InscripcionesModule),
],
  providers: [ProgresoLeccionesService],
  controllers: [ProgresoLeccionesController],
})  
export class ProgresoLeccionesModule {}
