import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Curso } from '../../cursos/entities/curso.entity';

@Entity('docentes')
export class Docente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  telefono: string;

  // Relación 1 docente → muchos cursos
  @OneToMany(() => Curso, (curso) => curso.docente, { cascade: true })
  cursos: Curso[];
}
