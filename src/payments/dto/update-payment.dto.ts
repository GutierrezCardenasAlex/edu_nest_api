// src/payments/dto/update-payment.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { IsEnum } from 'class-validator';
import { PaymentStatus } from '../entities/payment.entity';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @IsEnum(PaymentStatus)
  estado?: PaymentStatus;
}