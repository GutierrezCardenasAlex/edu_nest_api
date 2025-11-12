// src/appointments/appointments.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { Appointment, AppointmentStatus } from './entities/appointment.entity';
import { Payment, PaymentStatus } from 'src/payments/entities/payment.entity';
import { CreateAvailableDto } from './dto/create-available.dto';
import { PayDto } from './dto/pay.dto';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private repo: Repository<Appointment>,
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
  ) {}

  async createAvailable(dto: CreateAvailableDto, instructor: UserActiveInterface) {
    const appt = this.repo.create({
      ...dto,
      status: AppointmentStatus.PENDING,
      user: null,
      payments: [],
    });
    return this.repo.save(appt);
  }

  async getAvailable() {
    return this.repo.find({
      where: { status: AppointmentStatus.PENDING },
      relations: ['payments'],
      order: { date: 'ASC' },
    });
  }

  async reserve(id: number, user: UserActiveInterface) {
    const appt = await this.repo.findOne({
      where: { id, status: AppointmentStatus.PENDING },
    });
    if (!appt) throw new NotFoundException('Cita no disponible');

    appt.status = AppointmentStatus.RESERVED;
    appt.user = { id: user.userId } as any; // ← TypeORM acepta esto

    const payment = this.paymentRepo.create({
      monto: appt.price,
      metodo: appt.paymentMethod,
      estado: PaymentStatus.PENDING,
      appointment: appt,
    });

    appt.payments = [payment];
    return this.repo.save(appt);
  }

  async pay(id: number, dto: PayDto, user: UserActiveInterface) {
    const appt = await this.repo.findOne({
      where: {
        id,
        user: { id: Equal(user.userId) }, // ← Usa Equal
        status: AppointmentStatus.RESERVED,
      },
      relations: ['payments'],
    });
    if (!appt) throw new NotFoundException('Cita no reservada');

    const payment = appt.payments[0];
    payment.metodo = dto.method;
    payment.comprobante = dto.proof;
    payment.estado = PaymentStatus.PENDING;
    appt.status = AppointmentStatus.PAID;

    return this.repo.save(appt);
  }

  async approvePayment(id: number) {
    const appt = await this.repo.findOne({
      where: { id, status: AppointmentStatus.PAID },
      relations: ['payments'],
    });
    if (!appt) throw new BadRequestException('Cita no pagada');

    const payment = appt.payments[0];
    payment.estado = PaymentStatus.APPROVED;
    appt.status = AppointmentStatus.CONFIRMED;

    return this.repo.save(appt);
  }

  async rejectPayment(id: number) {
    const appt = await this.repo.findOne({
      where: { id, status: AppointmentStatus.PAID },
      relations: ['payments'],
    });
    if (!appt) throw new BadRequestException('Cita no pagada');

    const payment = appt.payments[0];
    payment.estado = PaymentStatus.REJECTED;
    appt.status = AppointmentStatus.CANCELLED;

    return this.repo.save(appt);
  }

  async findAllAdmin() {
    return this.repo.find({
      relations: ['user', 'payments'],
      order: { date: 'DESC' },
    });
  }

  // src/appointments/appointments.service.ts
  async findByUser(userId: string | number) {
    return this.repo.find({
      where: { 
        user: { 
          id: Equal(userId.toString()) // ← FORZAMOS A STRING
        } 
      },
      relations: ['payments'],
      order: { date: 'DESC' },
    });
  }
}