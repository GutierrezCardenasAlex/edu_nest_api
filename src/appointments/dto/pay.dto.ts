// src/appointments/dto/pay.dto.ts
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PaymentMethod } from '../../payments/entities/payment.entity';

export class PayDto {
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  method: PaymentMethod;

  @IsString()
  @IsNotEmpty()
  proof: string;
}