import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { Curso } from '../cursos/entities/curso.entity';
import { User } from '../../users/entities/user.entity'; 


@Injectable()
export class InscripcionesService {
  constructor(
    @InjectRepository(Inscripcion)
    private readonly inscripcionRepo: Repository<Inscripcion>,
    @InjectRepository(Curso)
    private readonly cursoRepo: Repository<Curso>,
    @InjectRepository(User)
    private readonly usuarioRepo: Repository<User>,
  ) {}

  async create(dto: CreateInscripcionDto): Promise<Inscripcion> {
    const curso = await this.cursoRepo.findOneBy({ id: dto.cursoId });
    if (!curso) throw new Error('Curso no encontrado');

    const usuario = await this.usuarioRepo.findOneBy({ id: dto.usuarioId });
    if (!usuario) throw new Error('Usuario no encontrado');

    const inscripcion = this.inscripcionRepo.create({
      curso,
      usuario,
      progreso: dto.progreso ?? 0,
      completado: dto.completado ?? false,
    });

    return this.inscripcionRepo.save(inscripcion);
  }

  findAll(): Promise<Inscripcion[]> {
    return this.inscripcionRepo.find({ relations: ['curso', 'usuario'] });
  }

  findOne(id: number): Promise<Inscripcion | null> {
    return this.inscripcionRepo.findOne({
      where: { id },
      relations: ['curso', 'usuario'],
    });
  }

  async update(id: number, dto: UpdateInscripcionDto): Promise<Inscripcion> {
    const inscripcion = await this.inscripcionRepo.findOneBy({ id });
    if (!inscripcion) throw new Error('Inscripción no encontrada');

    Object.assign(inscripcion, dto);
    return this.inscripcionRepo.save(inscripcion);
  }

  async remove(id: number): Promise<void> {
    await this.inscripcionRepo.delete(id);
  }
}
