// src/Modul_cursos/certificados/entities/certificado.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Inscripcion } from '../../inscripciones/entities/inscripcion.entity';

@Entity('certificados')
export class Certificado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Inscripcion, (inscripcion) => inscripcion.certificados, {
    onDelete: 'CASCADE',
  })
  inscripcion: Inscripcion;

  @Column({ type: 'date' })
  fechaEmision: Date;

  @CreateDateColumn()
  created_at: Date;
}