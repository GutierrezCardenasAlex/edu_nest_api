import { Module, forwardRef } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { InscripcionesController } from './inscripciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { Curso } from '../cursos/entities/curso.entity';
import { User } from '../../users/entities/user.entity'; 
import { Certificado } from '../certificados/entities/certificado.entity';
import { ProgresoLeccionesModule } from '../progreso-lecciones/progreso-lecciones.module';

@Module({
  imports: [TypeOrmModule.forFeature([Inscripcion, Curso, User, Certificado]),
  forwardRef(() => ProgresoLeccionesModule),
],
  providers: [InscripcionesService],
  controllers: [InscripcionesController],
  exports: [InscripcionesService],
})
export class InscripcionesModule {}
