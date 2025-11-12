import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, 
UpdateDateColumn, OneToMany,} from 'typeorm';
import { Temario } from '../../temarios/entities/temario.entity';
import { Inscripcion } from '../../inscripciones/entities/inscripcion.entity';
import { Docente } from '../../docente/entities/docente.entity';

@Entity('cursos')
export class Curso {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagen_portada: string;

  @Column({ type: 'bigint', nullable: true })
  categoria_id: number;

  @Column({ type: 'bigint', nullable: true })
  subcategoria_id: number;

  @Column({ type: 'bigint', nullable: true })
  docente_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  precio: number;

  @Column({ type: 'boolean', default: false })
  es_gratuito: boolean;

  @Column({
    type: 'enum',
    enum: ['Principiante', 'Intermedio', 'Avanzado'],
    default: 'Principiante',
  })
  nivel: 'Principiante' | 'Intermedio' | 'Avanzado';

  @Column({
    type: 'enum',
    enum: ['Borrador', 'Publicado', 'Inactivo'],
    default: 'Borrador',
  })
  estado: 'Borrador' | 'Publicado' | 'Inactivo';

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Temario, (temario) => temario.curso) 
  temarios: Temario[];

  @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.curso)
  inscripciones: Inscripcion[];

  @ManyToOne(() => Docente, (docente) => docente.cursos, { eager: true })
  docente: Docente[];
}
