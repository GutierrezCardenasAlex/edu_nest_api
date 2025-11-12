// src/Modul_cursos/certificados/certificados.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificado } from './entities/certificado.entity';
import { Inscripcion } from '../inscripciones/entities/inscripcion.entity';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';

@Injectable()
export class CertificadosService {
  constructor(
    @InjectRepository(Certificado)
    private certificadoRepo: Repository<Certificado>,
    @InjectRepository(Inscripcion)
    private inscripcionRepo: Repository<Inscripcion>,
  ) {}

  // CREATE
  async create(dto: CreateCertificadoDto): Promise<Certificado> {
    const inscripcion = await this.inscripcionRepo.findOneBy({
      id: dto.inscripcionId,
    });

    if (!inscripcion) {
      throw new NotFoundException('Inscripción no encontrada');
    }

    const certificado = this.certificadoRepo.create({
      inscripcion,
      fechaEmision: new Date(),
    });

    return this.certificadoRepo.save(certificado);
  }

  // FIND ALL
  async findAll(): Promise<Certificado[]> {
    return this.certificadoRepo.find({
      relations: ['inscripcion'],
    });
  }

  // FIND ONE
  async findOne(id: string): Promise<Certificado> {
    const certificado = await this.certificadoRepo.findOne({
      where: { id },
      relations: ['inscripcion'],
    });

    if (!certificado) {
      throw new NotFoundException(`Certificado con ID ${id} no encontrado`);
    }

    return certificado;
  }

  // UPDATE
  // src/Modul_cursos/certificados/certificados.service.ts
async update(id: string, dto: UpdateCertificadoDto): Promise<Certificado> {
  const certificado = await this.findOne(id);

  if (dto.inscripcionId) {
    const inscripcion = await this.inscripcionRepo.findOneBy({
      id: dto.inscripcionId,
    });
    if (!inscripcion) {
      throw new NotFoundException('Inscripción no encontrada');
    }
    certificado.inscripcion = inscripcion;
  }

  if (dto.fechaEmision) {
    // CONVERSIÓN: string → Date
    certificado.fechaEmision = new Date(dto.fechaEmision);
  }

  return this.certificadoRepo.save(certificado);
}

  // DELETE
  async remove(id: string): Promise<void> {
    const certificado = await this.findOne(id);
    await this.certificadoRepo.remove(certificado);
  }
}