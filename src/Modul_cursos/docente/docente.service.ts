import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocenteDto } from '../../Modul_cursos/docente/dto/create-docente.dto';
import { UpdateDocenteDto } from '../../Modul_cursos/docente/dto/update-docente.dto';
import { Docente } from '../../Modul_cursos/docente/entities/docente.entity';

@Injectable()
export class DocenteService {
  constructor(
    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,
  ) {}

  create(createDocenteDto: CreateDocenteDto) {
    const docente = this.docenteRepository.create(createDocenteDto);
    return this.docenteRepository.save(docente);
  }

  findAll() {
    return this.docenteRepository.find({
      relations: ['cursos'],
    });
  }

  async findOne(id: number) {
    const docente = await this.docenteRepository.findOne({
      where: { id },
      relations: ['cursos'],
    });
    if (!docente) throw new NotFoundException('Docente no encontrado');
    return docente;
  }

  async update(id: number, updateDocenteDto: UpdateDocenteDto) {
    const docente = await this.findOne(id);
    Object.assign(docente, updateDocenteDto);
    return this.docenteRepository.save(docente);
  }

  async remove(id: number) {
    const docente = await this.findOne(id);
    return this.docenteRepository.remove(docente);
  }
}

