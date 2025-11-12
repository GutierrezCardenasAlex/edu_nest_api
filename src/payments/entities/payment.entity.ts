// src/payments/entities/payment.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Inscripcion } from '../../Modul_cursos/inscripciones/entities/inscripcion.entity';

export enum PaymentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  QR = 'qr',
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Appointment, (appointment) => appointment.payments, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  appointment: Appointment;

  @ManyToOne(() => Inscripcion, { nullable: true, onDelete: 'SET NULL' })
  inscripcion?: Inscripcion;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  estado: PaymentStatus;

  @Column({ type: 'enum', enum: PaymentMethod })
  metodo: PaymentMethod;

  @Column({ nullable: true })
  comprobante?: string;

  @CreateDateColumn()
  created_at: Date;
}