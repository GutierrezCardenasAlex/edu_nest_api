import { IsNotEmpty, IsDateString, IsOptional, IsString, IsBoolean, IsUUID, IsNumber, IsEnum } from 'class-validator';
import { PaymentMethod } from '../entities/appointment.entity';

export class CreateAppointmentDto {
  @IsDateString()
  date:string;

  @IsNumber()
  price:number;

  @IsEnum(PaymentMethod)
  paymentMethod:PaymentMethod;
}
