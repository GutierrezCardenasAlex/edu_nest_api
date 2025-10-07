import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Temario } from './entities/temario.entity';
import { CreateTemarioDto } from './dto/create-temario.dto';
import { UpdateTemarioDto } from './dto/update-temario.dto';
import { Curso } from '../cursos/entities/curso.entity';

@Injectable()
export class TemariosService {
  constructor(
    @InjectRepository(Temario)
    private readonly temarioRepository: Repository<Temario>,
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}

  async create(dto: CreateTemarioDto): Promise<Temario> {
    const curso = await this.cursoRepository.findOneBy({ id: dto.cursoId });
    if (!curso) throw new Error('Curso no encontrado');

    const temario = this.temarioRepository.create({
      titulo: dto.titulo,
      orden: dto.orden ?? 0,
      curso,
    });
    return this.temarioRepository.save(temario);
  }

  findAll(): Promise<Temario[]> {
    return this.temarioRepository.find({ relations: ['curso'] });
  }

  async findOne(id: number): Promise<Temario> {
    const temario = await this.temarioRepository.findOne({
      where: { id },
      relations: ['curso'],
    });
    if (!temario) throw new Error('Temario no encontrado');
    return temario;
  }

  async update(id: number, dto: UpdateTemarioDto): Promise<Temario> {
    const temario = await this.temarioRepository.findOneBy({ id });
    if (!temario) throw new Error('Temario no encontrado');

    Object.assign(temario, dto);
    return this.temarioRepository.save(temario);
  }

  async remove(id: number): Promise<void> {
    await this.temarioRepository.delete(id);
  }
}
