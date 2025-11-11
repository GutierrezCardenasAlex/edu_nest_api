import { Injectable, NotFoundException, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgresoLeccion } from './entities/progreso-leccion.entity';
import { CreateProgresoLeccionDto } from './dto/create-progreso-leccion.dto';
import { UpdateProgresoLeccionDto } from './dto/update-progreso-leccion.dto';
import { Inscripcion } from '../inscripciones/entities/inscripcion.entity';
import { Leccion } from '../lecciones/entities/leccion.entity';
import { InscripcionesService } from '../inscripciones/inscripciones.service';

@Injectable()
export class ProgresoLeccionesService {
  constructor(
    @InjectRepository(ProgresoLeccion)
    private readonly progresoRepo: Repository<ProgresoLeccion>,

    @InjectRepository(Inscripcion)
    private readonly inscripcionRepo: Repository<Inscripcion>,

    @InjectRepository(Leccion)
    private readonly leccionRepo: Repository<Leccion>,

    // Inyectamos el servicio de Inscripciones para poder generar certificados
    @Inject(forwardRef(() => InscripcionesService))
    private readonly inscripcionesService: InscripcionesService,
  ) {}

  /**
   * Crear registro de progreso de una lección
   * Se usa cuando el usuario inicia o completa una lección
   */
  async create(dto: CreateProgresoLeccionDto): Promise<ProgresoLeccion> {
    const inscripcion = await this.inscripcionRepo.findOneBy({ id: dto.inscripcionId });
    if (!inscripcion) throw new NotFoundException('Inscripción no encontrada');

    const leccion = await this.leccionRepo.findOneBy({ id: dto.leccionId });
    if (!leccion) throw new NotFoundException('Lección no encontrada');

    const progreso = this.progresoRepo.create({
      inscripcion,
      leccion,
      completado: dto.completado ?? false,
    });

    const saved = await this.progresoRepo.save(progreso);

    // Si la lección fue completada, recalcular el progreso total del curso
    if (dto.completado) {
      await this.calcularProgresoCurso(inscripcion.id);
    }

    return saved;
  }

  /**
   * Listar todos los registros de progreso con sus relaciones
   */
  findAll(): Promise<ProgresoLeccion[]> {
    return this.progresoRepo.find({ relations: ['inscripcion', 'leccion'] });
  }

  /**
   * Buscar un progreso específico
   */
  findOne(id: number): Promise<ProgresoLeccion | null> {
    return this.progresoRepo.findOne({
      where: { id },
      relations: ['inscripcion', 'leccion'],
    });
  }

  /**
   * Actualizar progreso de una lección (cuando el usuario la completa)
   */
  async update(id: number, dto: UpdateProgresoLeccionDto): Promise<ProgresoLeccion> {
    const progreso = await this.progresoRepo.findOne({
      where: { id },
      relations: ['inscripcion', 'leccion'],
    });
    if (!progreso) throw new NotFoundException('Registro no encontrado');

    Object.assign(progreso, dto);

    if (dto.completado && !progreso.fechaCompletado) {
      progreso.fechaCompletado = new Date();
    }

    const saved = await this.progresoRepo.save(progreso);

    // Recalcular progreso total si se completó una lección
    if (dto.completado) {
      await this.calcularProgresoCurso(progreso.inscripcion.id);
    }

    return saved;
  }

  /**
   * Eliminar registro de progreso
   */
  async remove(id: number): Promise<void> {
    await this.progresoRepo.delete(id);
  }

  /**
   * Calcular progreso total del curso de una inscripción
   * - Cuenta todas las lecciones del curso
   * - Calcula porcentaje completado
   * - Actualiza el progreso de la inscripción
   * - Genera certificado si llega al 100%
   */
  private async calcularProgresoCurso(inscripcionId: number): Promise<void> {
    const inscripcion = await this.inscripcionRepo.findOne({
      where: { id: inscripcionId },
      relations: ['curso', 'usuario'],
    });

    if (!inscripcion) throw new NotFoundException('Inscripción no encontrada');

    // Contar total de lecciones del curso
    const totalLecciones = await this.leccionRepo.count({
      where: { temario: { curso: { id: inscripcion.curso.id } } },
    });
    if (totalLecciones === 0) return;

    // Contar cuántas fueron completadas
    const completadas = await this.progresoRepo.count({
      where: { inscripcion: { id: inscripcionId }, completado: true },
    });

    // Calcular porcentaje
    const porcentaje = (completadas / totalLecciones) * 100;

    inscripcion.progreso = parseFloat(porcentaje.toFixed(2));
    inscripcion.completado = porcentaje === 100;

    await this.inscripcionRepo.save(inscripcion);

    // Si completó el 100% del curso, generar el certificado automáticamente
    if (inscripcion.completado) {
      await this.inscripcionesService['generarCertificado'](inscripcion);
      console.log(`Curso completado. Certificado generado para ${inscripcion.usuario.name}`);
    }
  }
}
