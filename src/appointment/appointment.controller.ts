import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentEntity } from './appointment.entity';
import { AppointmentDto } from './appointment.dto';
import { SessionGuard } from 'src/user/session.gaurd';
import { Request } from 'express';
import { PatientEntity } from 'src/patient/patient.entity';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('createAppointment/:patientId')
  @UseGuards(SessionGuard)
  async createAppointment(
    @Req() req: Request,
    @Param('patientId') patientId: number,
    @Body() appointmentDto: AppointmentDto,
  ): Promise<AppointmentEntity> {
    const doctorId = (req.session.user as any).doctor.d_id;

    return await this.appointmentService.createAppointment(
      appointmentDto,
      doctorId,
      patientId,
    );
  }

  // find all patient by logged in doctor id

  @Get('findAllPatients')
  @UseGuards(SessionGuard)
  async getPatients(@Req() req: Request): Promise<PatientEntity[]> {
    const doctorId = (req.session.user as any).doctor.d_id;
    return await this.appointmentService.getPatientsByDoctor(doctorId);
  }

  // find all appointment for doctor who is logged in
  @Get('appointmentHistory')
  @UseGuards(SessionGuard)
  async appointmentHistory(@Req() req: Request): Promise<AppointmentEntity[]> {
    const doctorId = (req.session.user as any).doctor.d_id;
    return await this.appointmentService.getAllAppointment(doctorId);
  }
}
