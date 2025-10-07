import { Module } from '@nestjs/common';
import { CertificadosController } from './certificados.controller';
import { CertificadosService } from './certificados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificado } from './entities/certificado.entity';
import { Inscripcion } from '../inscripciones/entities/inscripcion.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Certificado, Inscripcion])],
  controllers: [CertificadosController],
  providers: [CertificadosService]
})
export class CertificadosModule {}
