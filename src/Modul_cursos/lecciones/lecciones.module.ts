// src/Modul_cursos/lecciones/lecciones.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeccionesController } from './lecciones.controller';
import { LeccionesService } from './lecciones.service';
import { Leccion } from './entities/leccion.entity';
import { Temario } from '../temarios/entities/temario.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [AuthModule,TypeOrmModule.forFeature([Leccion, Temario])],
  controllers: [LeccionesController],
  providers: [LeccionesService],
  exports: [LeccionesService],
})
export class LeccionesModule {}