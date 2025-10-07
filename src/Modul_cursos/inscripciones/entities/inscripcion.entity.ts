import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Unique, OneToMany,} from 'typeorm';
import { Curso } from '../../cursos/entities/curso.entity';
import { User } from '../../../users/entities/user.entity';
import { ProgresoLeccion } from '../../progreso-lecciones/entities/progreso-leccion.entity';
import { Certificado } from '../../certificados/entities/certificado.entity';


@Entity('inscripciones')
@Unique(['curso', 'usuario'])
export class Inscripcion {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @ManyToOne(() => Curso, (curso) => curso.inscripciones, { onDelete: 'CASCADE' })
  curso: Curso;

  @ManyToOne(() => User, (user) => user.inscripciones, { onDelete: 'CASCADE' })
  usuario: User;

  @CreateDateColumn({ name: 'fecha_inscripcion' })
    fechaInscripcion: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  progreso: number;

  @Column({ type: 'boolean', default: false })
  completado: boolean;

  @OneToMany(() => ProgresoLeccion, (progreso) => progreso.inscripcion)
  progresos: ProgresoLeccion[];

  @OneToMany(() => Certificado, (certificado) => certificado.inscripcion)
certificados: Certificado[];

}