import { Module } from '@nestjs/common';
import { LeccionesService } from './lecciones.service';
import { LeccionesController } from './lecciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leccion } from './entities/leccion.entity';
import { Temario } from '../temarios/entities/temario.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Leccion, Temario])],
  providers: [LeccionesService],
  controllers: [LeccionesController]
})
export class LeccionesModule {}
