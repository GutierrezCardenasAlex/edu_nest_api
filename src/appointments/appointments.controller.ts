// src/appointments/appointments.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAvailableDto } from './dto/create-available.dto';
import { PayDto } from './dto/pay.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}

  @Post('available')
  createAvailable(
    @Body() dto: CreateAvailableDto,
    @ActiveUser() instructor: UserActiveInterface, // ← CORRECTO
  ) {
    return this.service.createAvailable(dto, instructor);
  }

  @Get('available')
  getAvailable() {
    return this.service.getAvailable();
  }

  @Post(':id/reserve')
  reserve(
    @Param('id', ParseIntPipe) id: number,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.service.reserve(id, user);
  }

  @Post(':id/pay')
  pay(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PayDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.service.pay(id, dto, user);
  }

  @Patch(':id/approve')
  approve(@Param('id', ParseIntPipe) id: number) {
    return this.service.approvePayment(id);
  }

  @Patch(':id/reject')
  reject(@Param('id', ParseIntPipe) id: number) {
    return this.service.rejectPayment(id);
  }

  @Get('admin')
  findAllAdmin() {
    return this.service.findAllAdmin();
  }

  @Get('my')
  findMy(@ActiveUser() user: UserActiveInterface) {
    return this.service.findByUser(user.userId); // ← Usa userId
  }
}