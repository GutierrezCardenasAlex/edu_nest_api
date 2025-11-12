// src/Modul_cursos/lecciones/lecciones.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leccion } from './entities/leccion.entity';
import { CreateLeccionDto } from './dto/create-leccion.dto';
import { Temario } from '../temarios/entities/temario.entity';

@Injectable()
export class LeccionesService {
  constructor(
    @InjectRepository(Leccion)
    private readonly leccionRepo: Repository<Leccion>,
    @InjectRepository(Temario)
    private readonly temarioRepo: Repository<Temario>,
  ) {}

  async crear(dto: CreateLeccionDto, userId: string) {
    const temario = await this.temarioRepo.findOne({
      where: { id: dto.temarioId },
      relations: ['curso'],
    });

    if (!temario) throw new NotFoundException('Temario no encontrado');
    if (temario.curso.docente_id !== Number(userId)) {
      throw new ForbiddenException('No tienes permiso');
    }

    const leccion = this.leccionRepo.create({
      ...dto,
      temario,
    });

    return this.leccionRepo.save(leccion);
  }

  async findByTemario(temarioId: string) {
    return this.leccionRepo.find({
      where: { temario: { id: temarioId } },
      order: { orden: 'ASC' },
    });
  }
}