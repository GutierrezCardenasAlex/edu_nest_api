import { Module } from '@nestjs/common';
import { TemariosService } from './temarios.service';
import { TemariosController } from './temarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Temario } from './entities/temario.entity';
import { Curso } from '../cursos/entities/curso.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Temario, Curso])],
  providers: [TemariosService],
  controllers: [TemariosController]
})
export class TemariosModule {}
