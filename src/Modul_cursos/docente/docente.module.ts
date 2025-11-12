import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocenteService } from '../../Modul_cursos/docente/docente.service';
import { DocenteController } from '../../Modul_cursos/docente/docente.controller';
import { Docente } from '../../Modul_cursos/docente/entities/docente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Docente])],
  controllers: [DocenteController],
  providers: [DocenteService], 
})
export class DocenteModule {}

