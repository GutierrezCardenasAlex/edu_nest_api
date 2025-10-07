import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgresoLeccion } from './entities/progreso-leccion.entity';
import { CreateProgresoLeccionDto } from './dto/create-progreso-leccion.dto';
import { UpdateProgresoLeccionDto } from './dto/update-progreso-leccion.dto';
import { Inscripcion } from '../inscripciones/entities/inscripcion.entity';
import { Leccion } from '../lecciones/entities/leccion.entity';

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

  async create(dto: CreateProgresoLeccionDto): Promise<ProgresoLeccion> {
    const inscripcion = await this.inscripcionRepo.findOneBy({ id: dto.inscripcionId});
    if (!inscripcion) throw new Error('Inscripción no encontrada');

    const leccion = await this.leccionRepo.findOneBy({ id: dto.leccionId });
    if (!leccion) throw new Error('Lección no encontrada');

    const progreso = this.progresoRepo.create({
      inscripcion,
      leccion,
      completado: dto.completado ?? false,
    });

    return this.progresoRepo.save(progreso);
  }

  findAll(): Promise<ProgresoLeccion[]> {
    return this.progresoRepo.find({ relations: ['inscripcion', 'leccion'] });
  }

  findOne(id: number): Promise<ProgresoLeccion | null> {
    return this.progresoRepo.findOne({
      where: { id },
      relations: ['inscripcion', 'leccion'],
    });
  }

  async update(id: number, dto: UpdateProgresoLeccionDto): Promise<ProgresoLeccion> {
    const progreso = await this.progresoRepo.findOneBy({ id });
    if (!progreso) throw new Error('Registro no encontrado');

    Object.assign(progreso, dto);
    if (dto.completado) {
      progreso.fechaCompletado = new Date();
    }

    return this.progresoRepo.save(progreso);
  }

  async remove(id: number): Promise<void> {
    await this.progresoRepo.delete(id);
  }
}
