import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { Curso } from '../cursos/entities/curso.entity';
import { User } from '../../users/entities/user.entity';
import { Certificado } from '../certificados/entities/certificado.entity';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs-extra';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class InscripcionesService {
  constructor(
    @InjectRepository(Inscripcion)
    private readonly inscripcionRepo: Repository<Inscripcion>,
    @InjectRepository(Curso)
    private readonly cursoRepo: Repository<Curso>,
    @InjectRepository(User)
    private readonly usuarioRepo: Repository<User>,
    @InjectRepository(Certificado)
    private readonly certificadoRepo: Repository<Certificado>,
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
    const inscripcion = await this.inscripcionRepo.findOne({
      where: { id },
      relations: ['curso', 'usuario'],
    });

    if (!inscripcion) throw new Error('Inscripción no encontrada');

    // Si se completa el curso, genera el certificado
    const wasCompleted = inscripcion.completado;
    Object.assign(inscripcion, dto);
    const updated = await this.inscripcionRepo.save(inscripcion);

    if (!wasCompleted && updated.completado === true) {
      await this.generarCertificado(updated);
    }

    return updated;
  }

  async remove(id: number): Promise<void> {
    await this.inscripcionRepo.delete(id);
  }

  private async generarCertificado(inscripcion: Inscripcion) {
    const codigo = 'CERT-' + randomBytes(5).toString('hex').toUpperCase();
    const carpeta = 'uploads/certificados';
    await fs.ensureDir(carpeta);
    const filePath = `${carpeta}/${codigo}.pdf`;

    // Generar el PDF
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(30).text('CERTIFICADO DE FINALIZACIÓN', { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text(`Otorgado a: ${inscripcion.usuario.name}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).text(
      `Por haber completado satisfactoriamente el curso: ${inscripcion.curso.titulo}`,
      { align: 'center' },
    );
    doc.moveDown();
    doc.text(`Código de certificado: ${codigo}`, { align: 'center' });
    doc.moveDown();
    doc.text(`Emitido el: ${new Date().toLocaleDateString()}`, { align: 'center' });
    doc.end();

    await new Promise((resolve) => stream.on('finish', resolve));

    // Guardar en BD
    const certificado = this.certificadoRepo.create({
      inscripcion,
      codigo_certificado: codigo,
      url_pdf: `${process.env.APP_URL ?? 'http://localhost:3001'}/${filePath}`,
    });

    await this.certificadoRepo.save(certificado);
  }
}
