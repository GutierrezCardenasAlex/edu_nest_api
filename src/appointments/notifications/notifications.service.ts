import { Injectable, Logger } from '@nestjs/common';

// Servicio básico de notificaciones. Reemplaza console.log por integración real (SMTP, Firebase, etc).
@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  async notifyUserAppointmentCreated(userEmail: string, appointmentId: number, scheduledAt: Date) {
    // placeholder: enviar email real aquí
    this.logger.log(`Notificación: cita ${appointmentId} creada para ${userEmail} en ${scheduledAt.toISOString()}`);
    // Aquí podrías invocar un servicio SMTP, un webhook, Firebase Cloud Messaging, etc.
  }

  async notifyUserAppointmentConfirmed(userEmail: string, appointmentId: number) {
    this.logger.log(`Notificación: cita ${appointmentId} CONFIRMADA para ${userEmail}`);
  }

  async notifyUserAppointmentCancelled(userEmail: string, appointmentId: number) {
    this.logger.log(`Notificación: cita ${appointmentId} CANCELADA para ${userEmail}`);
  }
}
