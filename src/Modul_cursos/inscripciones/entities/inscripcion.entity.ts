import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Curso } from '../../cursos/entities/curso.entity';
import { User } from 'src/users/entities/user.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { ProgresoLeccion } from 'src/Modul_cursos/progreso-lecciones/entities/progreso-leccion.entity';
import { Certificado } from 'src/Modul_cursos/certificados/entities/certificado.entity';

export enum InscripcionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('inscripciones')
export class Inscripcion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.inscripciones)
  usuario: User;

  @ManyToOne(() => Curso, (curso) => curso.inscripciones)
  curso: Curso;

  @Column({
    type: 'enum',
    enum: InscripcionStatus,
    default: InscripcionStatus.PENDING,
  })
  estado: InscripcionStatus;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => Payment, (payment) => payment.inscripcion, { cascade: true })
  @JoinColumn()
  pago: Payment;
  
  @OneToMany(() => ProgresoLeccion, (progreso) => progreso.inscripcion)
  progresos: ProgresoLeccion[];

  @OneToMany(() => Certificado, (certificado) => certificado.inscripcion)
  certificados: Certificado[];
}