// src/payments/payments.controller.ts
import {
  Controller,
  Get,
  Patch,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.paymentsService.findOne(id);
  }

  @Patch(':id/confirm')
  confirm(@Param('id', ParseUUIDPipe) id: string) {
    return this.paymentsService.confirmPayment(id);
  }

  @Patch(':id/reject')
  reject(@Param('id', ParseUUIDPipe) id: string) {
    return this.paymentsService.rejectPayment(id);
  }
}