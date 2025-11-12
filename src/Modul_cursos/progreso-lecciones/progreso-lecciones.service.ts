// src/Modul_cursos/progreso-lecciones/progreso-lecciones.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgresoLeccion } from './entities/progreso-leccion.entity';

import { Inscripcion } from '../inscripciones/entities/inscripcion.entity';
import { Leccion } from '../lecciones/entities/leccion.entity';
import { CreateProgresoDto } from './dto/create-progreso-leccion.dto';
import { UpdateProgresoDto } from './dto/update-progreso-leccion.dto';

@Injectable()
export class ProgresoLeccionesService {
  constructor(
    @InjectRepository(ProgresoLeccion)
    private readonly progresoRepo: Repository<ProgresoLeccion>,

    @InjectRepository(Inscripcion)
    private readonly inscripcionRepo: Repository<Inscripcion>,

    @InjectRepository(Leccion)
    private readonly leccionRepo: Repository<Leccion>,
  ) {}

  // CREAR PROGRESO
  async create(dto: CreateProgresoDto): Promise<ProgresoLeccion> {
    const inscripcion = await this.inscripcionRepo.findOne({
      where: { id: dto.inscripcionId },
    });
    if (!inscripcion) throw new NotFoundException('Inscripción no encontrada');

    const leccion = await this.leccionRepo.findOne({
      where: { id: dto.leccionId },
    });
    if (!leccion) throw new NotFoundException('Lección no encontrada');

    const yaExiste = await this.progresoRepo.findOne({
      where: { inscripcion: { id: dto.inscripcionId }, leccion: { id: dto.leccionId } },
    });
    if (yaExiste) throw new ConflictException('El progreso ya existe para esta lección e inscripción');

    const progreso = this.progresoRepo.create({
      inscripcion,
      leccion,
      completada: dto.completada ?? true,
      fecha_completado: dto.completada ? new Date() : undefined,
    });

    return this.progresoRepo.save(progreso);
  }

  // ACTUALIZAR PROGRESO
  async update(id: string, dto: UpdateProgresoDto): Promise<ProgresoLeccion> {
    const progreso = await this.progresoRepo.findOne({
      where: { id },
      relations: ['inscripcion', 'leccion'],
    });
    if (!progreso) throw new NotFoundException('Progreso no encontrado');

    // Actualizar completada
    progreso.completada = dto.completada;

    // Actualizar fecha_completado
    progreso.fecha_completado = dto.completada ? new Date() : undefined;

    return this.progresoRepo.save(progreso);
  }

  // OBTENER UNO
  async findOne(id: string): Promise<ProgresoLeccion> {
    const progreso = await this.progresoRepo.findOne({
      where: { id },
      relations: ['inscripcion', 'leccion'],
    });
    if (!progreso) throw new NotFoundException('Progreso no encontrado');
    return progreso;
  }

  // OBTENER POR INSCRIPCIÓN
  async findByInscripcion(inscripcionId: string): Promise<ProgresoLeccion[]> {
    return this.progresoRepo.find({
      where: { inscripcion: { id: inscripcionId } },
      relations: ['leccion'],
      order: { created_at: 'ASC' },
    });
  }

  // ELIMINAR
  async remove(id: string): Promise<void> {
    const result = await this.progresoRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Progreso no encontrado');
    }
  }
}