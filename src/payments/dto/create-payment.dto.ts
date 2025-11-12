// src/payments/dto/create-payment.dto.ts
import { IsUUID, IsNumber, IsEnum, IsOptional, IsString } from 'class-validator';
import { PaymentMethod, PaymentStatus } from '../entities/payment.entity';

export class CreatePaymentDto {
  @IsUUID()
  appointmentId: string;

  @IsNumber()
  monto: number;

  @IsEnum(PaymentMethod)
  metodo: PaymentMethod;

  @IsOptional()
  @IsUUID()
  inscripcionId?: string;

  @IsOptional()
  @IsString()
  comprobante?: string;
}