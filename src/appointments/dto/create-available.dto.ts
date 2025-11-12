// src/appointments/dto/create-available.dto.ts
import { IsDate, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { PaymentMethod } from '../entities/appointment.entity';

export class CreateAvailableDto {
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}