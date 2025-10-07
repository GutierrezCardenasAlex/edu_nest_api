import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificado } from './entities/certificado.entity';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';
import { Inscripcion } from '../inscripciones/entities/inscripcion.entity';


@Injectable()
export class CertificadosService {
    constructor(
        @InjectRepository(Certificado)
        private readonly certificadoRepo: Repository<Certificado>,
        @InjectRepository(Inscripcion)
        private readonly inscripcionRepo: Repository<Inscripcion>,
    ) {}

    async create(dto: CreateCertificadoDto): Promise<Certificado> {
        const inscripcion = await this.inscripcionRepo.findOneBy({ id: dto.inscripcionId });
        if (!inscripcion) {
            throw new NotFoundException('Inscripción no encontrada');
        }

        const certificado = this.certificadoRepo.create({
            ...dto,
            inscripcion,
        });

        return this.certificadoRepo.save(certificado);
    }

    findAll(): Promise<Certificado[]> {
        return this.certificadoRepo.find({ relations: ['inscripcion'] });
    }

    async findOne(id: number): Promise<Certificado> {
        const certificado = await this.certificadoRepo.findOne({
            where: { id },
            relations: ['inscripcion'],
        });

        if (!certificado) {
            throw new NotFoundException(`Certificado con id ${id} no encontrado`);
        }

        return certificado;

    }

    async update(
        id: number, 
        dto: UpdateCertificadoDto,):
        Promise<Certificado> {
        await this.certificadoRepo.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const result = await this.certificadoRepo.delete(id);
        if (result.affected === 0) {    
            throw new NotFoundException(`Certificado con id ${id} no encontrado`);
        }
    }

        
}
