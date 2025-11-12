// src/Modul_cursos/temarios/temarios.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Temario } from './entities/temario.entity';
import { CreateTemarioDto } from './dto/create-temario.dto';
import { Curso } from '../cursos/entities/curso.entity';


@Injectable()
export class TemariosService {
  constructor(
    @InjectRepository(Temario)
    private readonly temarioRepo: Repository<Temario>,
    @InjectRepository(Curso)
    private readonly cursoRepo: Repository<Curso>,
  ) {}

  async crear(dto: CreateTemarioDto, userId: string) {
    const curso = await this.cursoRepo.findOne({
      where: { id: Number(dto.cursoId) },
    });

    if (!curso) throw new NotFoundException('Curso no encontrado');
    if (curso.docente_id !== Number(userId)) {
      throw new ForbiddenException('Solo el instructor puede crear temarios');
    }

    const temario = this.temarioRepo.create({
      ...dto,
      curso,
    });

    return this.temarioRepo.save(temario);
  }

  async findByCurso(cursoId: string) {
    return this.temarioRepo.find({
      where: { curso: { id: Number(cursoId) } },
      relations: ['lecciones'],
      order: { orden: 'ASC', lecciones: { orden: 'ASC' } },
    });
  }
}