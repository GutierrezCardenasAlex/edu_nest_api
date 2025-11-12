// src/Modul_cursos/temarios/temarios.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemariosController } from './temarios.controller';
import { TemariosService } from './temarios.service';
import { Temario } from './entities/temario.entity';
import { Curso } from '../cursos/entities/curso.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule,TypeOrmModule.forFeature([Temario, Curso])],
  controllers: [TemariosController],
  providers: [TemariosService],
  exports: [TemariosService],
})
export class TemariosModule {}