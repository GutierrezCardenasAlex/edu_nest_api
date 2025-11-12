// src/Modul_cursos/progreso-lecciones/entities/progreso-leccion.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { Inscripcion } from '../../inscripciones/entities/inscripcion.entity';
import { Leccion } from '../../lecciones/entities/leccion.entity';

@Entity('progreso_lecciones')
@Unique(['inscripcion', 'leccion'])
export class ProgresoLeccion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Inscripcion, (i) => i.progresos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  inscripcion: Inscripcion;

  @ManyToOne(() => Leccion, (l) => l.progresos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  leccion: Leccion;

  @Column({ type: 'boolean', default: false })
  completada: boolean;

  @Column({ type: 'timestamp', nullable: true })
  fecha_completado?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}