import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Inscripcion } from 'src/Modul_cursos/inscripciones/entities/inscripcion.entity';
import { Role } from 'src/common/enums/rol.enum';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role; // ← ¡Importante! Tipo correcto

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.usuario)
  inscripciones: Inscripcion[];
}
