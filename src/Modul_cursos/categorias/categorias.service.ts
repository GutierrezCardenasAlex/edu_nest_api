import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>,
    ) {}

    create(dto: CreateCategoriaDto) {
        const categoria = this.categoriaRepository.create(dto);
        return this.categoriaRepository.save(categoria);
    }

    findAll() {
        return this.categoriaRepository.find({ relations: ['subcategorias'] });
    }   

    findOne(id: number) {
        return this.categoriaRepository.findOne({ 
            where: { id },
            relations: ['subcategorias']
        });
    }

    async update(id: number, dto: UpdateCategoriaDto) {
        await this.categoriaRepository.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: number) {
        await this.categoriaRepository.delete(id);
        return { deleted: true };
    }   
}
