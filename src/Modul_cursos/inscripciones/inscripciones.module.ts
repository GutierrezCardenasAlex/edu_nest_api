<<<<<<< HEAD
import { Module } from '@nestjs/common';
=======
import { Module, forwardRef } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { InscripcionesController } from './inscripciones.controller';
>>>>>>> origin/model_cursos
import { TypeOrmModule } from '@nestjs/typeorm';
import { InscripcionesController } from './inscripciones.controller';
import { InscripcionesService } from './inscripciones.service';
import { Inscripcion } from './entities/inscripcion.entity';
import { Curso } from '../cursos/entities/curso.entity';
<<<<<<< HEAD
import { Payment } from 'src/payments/entities/payment.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule,TypeOrmModule.forFeature([Inscripcion, Payment, Curso])],
  controllers: [InscripcionesController],
  providers: [InscripcionesService],
=======
import { User } from '../../users/entities/user.entity'; 
import { Certificado } from '../certificados/entities/certificado.entity';
import { ProgresoLeccionesModule } from '../progreso-lecciones/progreso-lecciones.module';

@Module({
  imports: [TypeOrmModule.forFeature([Inscripcion, Curso, User, Certificado]),
  forwardRef(() => ProgresoLeccionesModule),
],
  providers: [InscripcionesService],
  controllers: [InscripcionesController],
>>>>>>> origin/model_cursos
  exports: [InscripcionesService],
})
export class InscripcionesModule {}