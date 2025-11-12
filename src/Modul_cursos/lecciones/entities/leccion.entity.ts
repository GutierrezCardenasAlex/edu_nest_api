<<<<<<< HEAD
// src/Modul_cursos/lecciones/entities/leccion.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
=======
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, } from 'typeorm';
>>>>>>> origin/model_cursos
import { Temario } from '../../temarios/entities/temario.entity';
import { ProgresoLeccion } from '../../progreso-lecciones/entities/progreso-leccion.entity';

@Entity('lecciones')
export class Leccion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

<<<<<<< HEAD
  @Column({ type: 'varchar', length: 255 })
  titulo: string;
=======
    @ManyToOne(() => Temario, (temario) => temario.lecciones, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'temario_id' })
    temario: Temario;
>>>>>>> origin/model_cursos

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'text', nullable: true })
  video_url?: string;

  @Column({ type: 'integer', default: 0 })
  duracion_minutos: number;

  @Column({ type: 'integer', default: 0 })
  orden: number;

  @ManyToOne(() => Temario, (temario) => temario.lecciones, {
    onDelete: 'CASCADE',
  })
  temario: Temario;

  @OneToMany(() => ProgresoLeccion, (progreso) => progreso.leccion)
  progresos: ProgresoLeccion[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}