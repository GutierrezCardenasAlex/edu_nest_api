import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Inscripcion, InscripcionStatus } from './entities/inscripcion.entity';
import { Payment, PaymentStatus } from 'src/payments/entities/payment.entity';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { Curso } from '../cursos/entities/curso.entity';

@Injectable()
export class InscripcionesService {
  constructor(
    @InjectRepository(Inscripcion)
    private readonly inscripcionRepo: Repository<Inscripcion>,
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Curso)
    private readonly cursoRepo: Repository<Curso>,
  ) {}

async crearInscripcion(usuarioId: string, dto: CreateInscripcionDto) {
  const curso = await this.cursoRepo.findOne({
    where: { id: Number(dto.cursoId) },
  });

  if (!curso) throw new NotFoundException('Curso no encontrado');
  if (curso.estado !== 'Publicado')
    throw new BadRequestException('Curso no disponible');

  // Buscar si ya está inscrito
  const yaInscrito = await this.inscripcionRepo.findOne({
    where: {
      usuario: { id: usuarioId },
      curso: { id: curso.id },
    },
  });

  if (yaInscrito?.estado === InscripcionStatus.APPROVED)
    throw new BadRequestException('Ya estás inscrito');
  if (yaInscrito?.estado === InscripcionStatus.PENDING)
    throw new BadRequestException('Ya tienes una inscripción pendiente');

  const inscripcion = this.inscripcionRepo.create();
  inscripcion.usuario = { id: usuarioId } as any; // TypeORM lo maneja
  inscripcion.curso = curso;
  inscripcion.estado = InscripcionStatus.PENDING;

  const pago = this.paymentRepo.create({
    monto: curso.es_gratuito ? 0 : curso.precio,
    metodo: dto.metodoPago,
    comprobante: dto.comprobante,
    estado: curso.es_gratuito ? PaymentStatus.APPROVED : PaymentStatus.PENDING,
  });

  inscripcion.pago = pago;
  await this.inscripcionRepo.save(inscripcion);

  return {
    mensaje: curso.es_gratuito
      ? 'Inscripción gratuita aprobada'
      : 'Inscripción creada. Pago pendiente.',
    inscripcionId: inscripcion.id,
  };
}

async tieneAcceso(usuarioId: string, cursoId: string): Promise<boolean> {
  const count = await this.inscripcionRepo.count({
    where: {
      usuario: { id: usuarioId },
      curso: { id: Number(cursoId) },
      estado: InscripcionStatus.APPROVED,
    },
  });
  return count > 0;
}
  async findByCurso(cursoId: string) {
    return this.inscripcionRepo.find({
      where: { curso: { id: Number(cursoId) } },
      relations: ['usuario', 'pago'],
    });
  }
}