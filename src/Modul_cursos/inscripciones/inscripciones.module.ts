import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InscripcionesController } from './inscripciones.controller';
import { InscripcionesService } from './inscripciones.service';
import { Inscripcion } from './entities/inscripcion.entity';
import { Curso } from '../cursos/entities/curso.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule,TypeOrmModule.forFeature([Inscripcion, Payment, Curso])],
  controllers: [InscripcionesController],
  providers: [InscripcionesService],
  exports: [InscripcionesService],
})
export class InscripcionesModule {}