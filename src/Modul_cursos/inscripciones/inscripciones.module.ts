import { Module } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { InscripcionesController } from './inscripciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { Curso } from '../cursos/entities/curso.entity';
import { User } from '../../users/entities/user.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Inscripcion, Curso, User])],
  providers: [InscripcionesService],
  controllers: [InscripcionesController]
})
export class InscripcionesModule {}
