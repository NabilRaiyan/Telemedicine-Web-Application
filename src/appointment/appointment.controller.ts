import { Controller, Post, Body, Param } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentEntity } from './appointment.entity';
import { AppointmentDto } from './appointment.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('createAppointment/:doctorId/:patientId')
  async createAppointment(
    @Param('doctorId') doctorId: number,
    @Param('patientId') patientId: number,
    @Body() appointmentDto: AppointmentDto,
  ): Promise<AppointmentEntity> {
    return await this.appointmentService.createAppointment(
      appointmentDto,
      doctorId,
      patientId,
    );
  }
}
