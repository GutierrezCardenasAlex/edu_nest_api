import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany, JoinColumn,} from 'typeorm';
import { Curso } from '../../cursos/entities/curso.entity';
import { Leccion } from '../../lecciones/entities/leccion.entity';

@Entity('temarios')
export class Temario {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @ManyToOne(() => Curso, (curso) => curso.temarios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'curso_id' })
  curso: Curso;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'int', default: 0 })
  orden: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Leccion, (leccion) => leccion.temario)
  lecciones: Leccion[];
}
