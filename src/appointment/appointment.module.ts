import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from './appointment.entity';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { DoctorEntity } from 'src/doctor/doctor.entity';
import { PatientEntity } from 'src/patient/patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AppointmentEntity,
      DoctorEntity,
      PatientEntity,
      PatientEntity,
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
