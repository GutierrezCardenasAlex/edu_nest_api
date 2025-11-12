import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { PaymentMethod } from 'src/appointments/entities/appointment.entity';

export class CreateInscripcionDto {
  @IsUUID()
  @IsNotEmpty()
  cursoId: string;

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  metodoPago: PaymentMethod;

  @IsString()
  @IsNotEmpty()
  comprobante: string; // URL o base64
}