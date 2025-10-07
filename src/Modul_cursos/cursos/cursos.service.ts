import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';

@Injectable()
export class CursosService {
    constructor(
        @InjectRepository(Curso)
        private readonly cursoRepository: Repository<Curso>,
    ) {}
    create(dto: CreateCursoDto) {
        const curso = this.cursoRepository.create(dto);
        return this.cursoRepository.save(curso);
    }

    findAll() {
        return this.cursoRepository.find();
    }

    findOne(id: number) {
        return this.cursoRepository.findOneBy({ id });  
    }

    async update(id: number, dto: UpdateCursoDto) {
        await this.cursoRepository.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: number) {
        await this.cursoRepository.delete(id);
        return { deleted: true };
    }
}
