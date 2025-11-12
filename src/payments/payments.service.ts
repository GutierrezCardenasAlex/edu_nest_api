// src/payments/payments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './entities/payment.entity';
import { Appointment, AppointmentStatus } from '../appointments/entities/appointment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
  ) {}

  async findAll() {
    return this.paymentRepo.find({
      relations: ['appointment', 'appointment.user'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string) {
    const payment = await this.paymentRepo.findOne({
      where: { id },
      relations: ['appointment', 'appointment.user'],
    });
    if (!payment) throw new NotFoundException('Pago no encontrado');
    return payment;
  }

  async confirmPayment(id: string) {
    const payment = await this.paymentRepo.findOne({
      where: { id },
      relations: ['appointment'],
    });
    if (!payment) throw new NotFoundException('Pago no encontrado');

    payment.estado = PaymentStatus.APPROVED;
    await this.paymentRepo.save(payment);

    await this.appointmentRepo.update(payment.appointment.id, {
      status: AppointmentStatus.CONFIRMED,
    });

    return this.findOne(id);
  }

  async rejectPayment(id: string) {
    const payment = await this.paymentRepo.findOne({
      where: { id },
      relations: ['appointment'],
    });
    if (!payment) throw new NotFoundException('Pago no encontrado');

    payment.estado = PaymentStatus.REJECTED;
    await this.paymentRepo.save(payment);

    await this.appointmentRepo.update(payment.appointment.id, {
      status: AppointmentStatus.CANCELLED,
    });

    return this.findOne(id);
  }
}