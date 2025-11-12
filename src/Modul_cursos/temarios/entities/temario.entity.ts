<<<<<<< HEAD
// src/Modul_cursos/temarios/entities/temario.entity.ts
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
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany, JoinColumn,} from 'typeorm';
>>>>>>> origin/model_cursos
import { Curso } from '../../cursos/entities/curso.entity';
import { Leccion } from '../../lecciones/entities/leccion.entity';

@Entity('temarios')
export class Temario {
<<<<<<< HEAD
  @PrimaryGeneratedColumn('uuid')
  id: string;
=======
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @ManyToOne(() => Curso, (curso) => curso.temarios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'curso_id' })
  curso: Curso;
>>>>>>> origin/model_cursos

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'integer', default: 0 })
  orden: number;

  @ManyToOne(() => Curso, (curso) => curso.temarios, {
    onDelete: 'CASCADE',
  })
  curso: Curso;

  @OneToMany(() => Leccion, (leccion) => leccion.temario, {
    cascade: true,
  })
  lecciones: Leccion[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}