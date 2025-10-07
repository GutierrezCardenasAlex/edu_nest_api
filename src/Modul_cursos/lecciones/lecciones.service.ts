import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leccion } from './entities/leccion.entity';
import { CreateLeccionDto } from './dto/create-leccion.dto';
import { UpdateLeccionDto } from './dto/update-leccion.dto';
import { Temario } from '../temarios/entities/temario.entity';

@Injectable()
export class LeccionesService {
  constructor(
    @InjectRepository(Leccion)
    private readonly leccionRepository: Repository<Leccion>,
    @InjectRepository(Temario)
    private readonly temarioRepository: Repository<Temario>,
  ) {}

  async create(dto: CreateLeccionDto): Promise<Leccion> {
    const temario = await this.temarioRepository.findOneBy({ id: dto.temarioId });
    if (!temario) throw new Error('Temario no encontrado');

    const leccion = this.leccionRepository.create({
      ...dto,
      temario,
    });
    return this.leccionRepository.save(leccion);
  }

  findAll(): Promise<Leccion[]> {
    return this.leccionRepository.find({ relations: ['temario'] });
  }

  findOne(id: number): Promise<Leccion | null> {
    return this.leccionRepository.findOne({
      where: { id },
      relations: ['temario'],
    });
  }

  async update(id: number, dto: UpdateLeccionDto): Promise<Leccion> {
    const leccion = await this.leccionRepository.findOneBy({ id });
    if (!leccion) throw new Error('Lección no encontrada');

    Object.assign(leccion, dto);
    return this.leccionRepository.save(leccion);
  }

  async remove(id: number): Promise<void> {
    await this.leccionRepository.delete(id);
  }
}
